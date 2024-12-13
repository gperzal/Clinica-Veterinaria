import React, { useState, useEffect } from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import GeneralRestSection from "./treatmen-history/GeneralRestSection";
import TreatmentLogSection from "./treatmen-history/TreatmentLogSection";
import ContractSection from "./treatmen-history/ContractSection";
import Signature from "./treatmen-history/Signature";
import useToastNotification from "../../../../hooks/useToastNotification";
import { updateTreatmentLog, updateTreatments, getTreatmentLog } from "./../services/medicalRecordService";

const TreatmentHistory = ({ petData, treatmentLogId }) => {
  const [treatmentLogs, setTreatmentLogs] = useState([]); // Estado para los tratamientos
  const [contractSigned, setContractSigned] = useState(false); // Estado para el contrato firmado
  const [isSimulating, setIsSimulating] = useState(false); // Nuevo estado para controlar la simulación
  const [treatmentLogData, setTreatmentLogData] = useState({}); // Almacenar startDate y endDate
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const showToast = useToastNotification();

  const handleStartRest = async ({ startDate, endDate }) => {
    try {
      if (!treatmentLogId) {
        throw new Error("No se encontró un ID de registro de tratamiento.");
      }

      const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      const logs = Array.from({ length: totalDays }, (_, i) => ({
        date: new Date(new Date(startDate).getTime() + i * 86400000).toISOString().split("T")[0],
        treatment: `Tratamiento día ${i + 1}`,
        notes: "",
        confirmed: false,
      }));

      const updatedLog = await updateTreatmentLog(treatmentLogId, {
        startDate,
        endDate,
        treatments: logs,
        contractSigned: true,
      });

      setTreatmentLogs(updatedLog.treatments || logs);
      setContractSigned(updatedLog.contractSigned || true);
      setTreatmentLogData({ startDate, endDate });
    } catch (error) {
      console.error("Error al iniciar el reposo clínico:", error);
      showToast({
        title: "Error",
        description: "No se pudo guardar el reposo clínico. Inténtalo de nuevo.",
        status: "error",
      });
    }
  };

  const handleContractSigned = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false); // Finaliza la simulación
      setContractSigned(true); // Marca el contrato como firmado
    }, 6000); 
  };

  useEffect(() => {
    if (!treatmentLogId) {
      console.error("treatmentLogId no está definido.");
      return;
    }

    const fetchTreatmentLog = async () => {
      try {
        const response = await getTreatmentLog(treatmentLogId);
        setTreatmentLogs(response.treatments || []);
        setContractSigned(response.contractSigned || false);
        setTreatmentLogData({
          startDate: response.startDate || new Date().toISOString().split("T")[0],
          endDate: response.endDate || "",
        });
      } catch (error) {
        console.error("Error al cargar TreatmentLog:", error);
      }
    };

    fetchTreatmentLog();
  }, [treatmentLogId]);

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="90vw" mx="auto">
      <Heading size="lg" textAlign="center" mb={6} color="teal.500">
        Reposo Clínico de {petData?.name || "Mascota"}
      </Heading>

      {isSimulating ? (
        <Signature />
      ) : !contractSigned ? (
        <ContractSection onSignContract={handleContractSigned} />
      ) : (
        <>
          <GeneralRestSection onStartRest={handleStartRest} treatmentLogData={treatmentLogData} treatmentLogId={treatmentLogId} />
          {treatmentLogs.length > 0 && (
            <TreatmentLogSection
              treatmentLogs={treatmentLogs}
              setTreatmentLogs={setTreatmentLogs}
              treatmentLogId={treatmentLogId}
              onUpdateTreatment={async (logs) => {
                const updatedLog = await updateTreatments(treatmentLogId, logs);
                setTreatmentLogs(updatedLog.treatments || []);
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default TreatmentHistory;
