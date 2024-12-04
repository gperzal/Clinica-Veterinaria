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
  const [isSigning, setIsSigning] = useState(false); // Estado para animación de firma
  const [treatmentLogData, setTreatmentLogData] = useState({}); // Almacenar startDate y endDate
  const bgColor = useColorModeValue("gray.50", "gray.800");

  const showToast = useToastNotification();

  const handleStartRest = async ({ startDate, endDate }) => {
    try {
      if (!treatmentLogId) {
        throw new Error("No se encontró un ID de registro de tratamiento.");
      }

      // Generar tratamientos dinámicamente según las fechas
      const totalDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      const logs = Array.from({ length: totalDays }, (_, i) => ({
        date: new Date(new Date(startDate).getTime() + i * 86400000).toISOString().split("T")[0],
        treatment: `Tratamiento día ${i + 1}`,
        notes: "",
        confirmed: false,
      }));

      // Llama al endpoint para actualizar el registro de tratamientos
      const updatedLog = await updateTreatmentLog(treatmentLogId, {
        startDate,
        endDate,
        treatments: logs,
        contractSigned: true, // Marcar el contrato como firmado
      });

      // Actualiza el estado local basado en la respuesta del servidor
      setTreatmentLogs(updatedLog.treatments || logs); // Usa `logs` por defecto si la respuesta está vacía
      setContractSigned(updatedLog.contractSigned || true);
      setTreatmentLogData({ startDate, endDate }); // Actualiza los datos del registro
;
    } catch (error) {
      console.error("Error al iniciar el reposo clínico:", error);
      showToast({
        title: "Error",
        description: "No se pudo guardar el reposo clínico. Inténtalo de nuevo.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchTreatmentLog = async () => {
      try {
        const response = await getTreatmentLog(treatmentLogId); // Obtener datos del tratamiento
        console.log("TreatmentLog Fetched: ", response);

        setTreatmentLogs(response.treatments || []);
        setContractSigned(response.contractSigned || false);
        setTreatmentLogData({
          startDate: response.startDate || new Date().toISOString().split("T")[0],
          endDate: response.endDate || "",
        });
      } catch (error) {
        console.error("Error al cargar TreatmentLog:", error);
        showToast({
          title: "Error",
          description: "No se pudo cargar el registro de tratamientos.",
          status: "error",
        });
      }
    };

    fetchTreatmentLog();
  }, [treatmentLogId]);

  return (
    <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="90vw" mx="auto">
      <Heading size="lg" textAlign="center" mb={6} color="teal.500">
        Reposo Clínico de {petData?.name || "Mascota"}
      </Heading>

      {isSigning ? (
        <Signature />
      ) : !contractSigned ? (
        <ContractSection onSignContract={() => setContractSigned(true)} />
      ) : (
        <>
          <GeneralRestSection onStartRest={handleStartRest} treatmentLogData={treatmentLogData} />
          {treatmentLogs.length > 0 && (
            <TreatmentLogSection
              treatmentLogs={treatmentLogs}
              setTreatmentLogs={setTreatmentLogs}
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
