import React from "react";
import { Box, Heading, SimpleGrid, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
          breakpoint: 768,
          settings: { slidesToShow: 1 },
        },
      ],
    };

// Datos ficticios
const recommendedData = [
    { name: "Peso", value: 5 },
    { name: "Temperatura", value: 38 },
    { name: "Frecuencia Cardíaca", value: 160 },
    { name: "Frecuencia Respiratoria", value: 25 },
    { name: "Índice de Condición Corporal", value: 6 },
    { name: "Nivel de Hidratación", value: 80 },
    { name: "Presión Sistólica", value: 120 },
    { name: "Presión Diastólica", value: 80 },
  ];
  

  const petDataHistory = [
    { date: "2024-01", weight: 5, temperature: 37, heartRate: 160, respiratoryRate: 24, bodyCondition: 5, hydrationLevel: 75, systolicPressure: 115, diastolicPressure: 80 },
    { date: "2024-02", weight: 4.5, temperature: 38, heartRate: 165, respiratoryRate: 26, bodyCondition: 6, hydrationLevel: 80, systolicPressure: 120, diastolicPressure: 85 },
    { date: "2024-01", weight: 5, temperature: 37, heartRate: 160, respiratoryRate: 24, bodyCondition: 5, hydrationLevel: 75, systolicPressure: 115, diastolicPressure: 80 }, 
    { date: "2024-02", weight: 4.5, temperature: 38, heartRate: 165, respiratoryRate: 26, bodyCondition: 6, hydrationLevel: 80, systolicPressure: 120, diastolicPressure: 85 },
    { date: "2024-03", weight: 4.7, temperature: 37.5, heartRate: 158, respiratoryRate: 25, bodyCondition: 5.5, hydrationLevel: 78, systolicPressure: 118, diastolicPressure: 82 }, 
    { date: "2024-04", weight: 5.1, temperature: 36.8, heartRate: 162, respiratoryRate: 24, bodyCondition: 6, hydrationLevel: 80, systolicPressure: 120, diastolicPressure: 80 }, 
    { date: "2024-05", weight: 4.9, temperature: 37.2, heartRate: 159, respiratoryRate: 25, bodyCondition: 5.8, hydrationLevel: 77, systolicPressure: 117, diastolicPressure: 83 },
    { date: "2024-06", weight: 5, temperature: 37.4, heartRate: 161, respiratoryRate: 26, bodyCondition: 5.7, hydrationLevel: 79, systolicPressure: 119, diastolicPressure: 84 },
    { date: "2024-07", weight: 4.8, temperature: 38, heartRate: 164, respiratoryRate: 24, bodyCondition: 5.9, hydrationLevel: 76, systolicPressure: 116, diastolicPressure: 81 },
    { date: "2024-08", weight: 4.6, temperature: 37.1, heartRate: 160, respiratoryRate: 25, bodyCondition: 5.6, hydrationLevel: 78, systolicPressure: 115, diastolicPressure: 80 },
    { date: "2024-09", weight: 4.7, temperature: 37.3, heartRate: 162, respiratoryRate: 26, bodyCondition: 6, hydrationLevel: 80, systolicPressure: 120, diastolicPressure: 85 }, 
    { date: "2024-10", weight: 5, temperature: 37.8, heartRate: 165, respiratoryRate: 25, bodyCondition: 5.5, hydrationLevel: 77, systolicPressure: 118, diastolicPressure: 82 }, 
    { date: "2024-11", weight: 4.9, temperature: 36.9, heartRate: 160, respiratoryRate: 24, bodyCondition: 5.8, hydrationLevel: 79, systolicPressure: 119, diastolicPressure: 83 }, 
    { date: "2024-12", weight: 4.6, temperature: 37.5, heartRate: 158, respiratoryRate: 26, bodyCondition: 6, hydrationLevel: 80, systolicPressure: 120, diastolicPressure: 85 }, 
    { date: "2025-01", weight: 4.8, temperature: 37, heartRate: 162, respiratoryRate: 25, bodyCondition: 5.7, hydrationLevel: 78, systolicPressure: 117, diastolicPressure: 84 }, 
    { date: "2025-02", weight: 4.7, temperature: 37.6, heartRate: 161, respiratoryRate: 24, bodyCondition: 5.9, hydrationLevel: 77, systolicPressure: 115, diastolicPressure: 80 },
    { date: "2025-03", weight: 4.9, temperature: 37.8, heartRate: 165, respiratoryRate: 25, bodyCondition: 6, hydrationLevel: 79, systolicPressure: 118, diastolicPressure: 82 } 
    ];
    const calculateAverages = (history) => {
        const totalRecords = history.length;
      
        return {
          Peso: history.reduce((sum, record) => sum + record.weight, 0) / totalRecords,
          Temperatura: history.reduce((sum, record) => sum + record.temperature, 0) / totalRecords,
          "Frecuencia Cardíaca": history.reduce((sum, record) => sum + record.heartRate, 0) / totalRecords,
          "Frecuencia Respiratoria": history.reduce((sum, record) => sum + record.respiratoryRate, 0) / totalRecords,
          "Índice de Condición Corporal": history.reduce((sum, record) => sum + record.bodyCondition, 0) / totalRecords,
          "Nivel de Hidratación": history.reduce((sum, record) => sum + record.hydrationLevel, 0) / totalRecords,
          "Presión Sistólica": history.reduce((sum, record) => sum + record.systolicPressure, 0) / totalRecords,
          "Presión Diastólica": history.reduce((sum, record) => sum + record.diastolicPressure, 0) / totalRecords,
        };
      };
      
      const petAverages = calculateAverages(petDataHistory);
      
      // Convertir promedios a formato para el gráfico
      const actualData = Object.keys(petAverages).map((key) => ({
        name: key,
        value: petAverages[key],
      }));
      
      // Tarjeta Métrica
const HealthMetricCard = ({ title, value, analysis, trend }) => {
    const trendColor = trend === "above" ? "red.500" : trend === "below" ? "blue.500" : "green.500";
    const trendIcon = trend === "above" ? "⬆️" : trend === "below" ? "⬇️" : "✔️";
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ margin: "10px" }}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="lg"
          shadow="md"
          p={6}
          w="100%"
          maxW="sm"
          h="200px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Heading size="md" mb={2} color={useColorModeValue("gray.700", "white")} textAlign="center">
            {title}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color={trendColor} textAlign="center">
            {value.toFixed(1)} {trendIcon}
          </Text>
          <Text color={useColorModeValue("gray.600", "gray.300")} textAlign="center">
            {analysis}
          </Text>
        </Box>
      </motion.div>
    );
  };
      
  const HealthHistory = () => {
    const bgColor = useColorModeValue("gray.50", "gray.900");
  
    return (
      <Box p={6} bg={bgColor} borderRadius="lg" shadow="lg" maxWidth="100%" mx="auto">
        <Heading size="lg" mb={6} textAlign="center" color="teal.500">
          Historial de Salud
        </Heading>
        <Text textAlign="center" mb={4}>
          Comparando registros acumulados de signos vitales promedios vs datos recomendados por la <b>OMS</b>.
        </Text>
  
        {/* Carrusel de Métricas */}
        <Slider {...sliderSettings}>
          {Object.keys(petAverages).map((key) => (
            <HealthMetricCard
              key={key}
              title={key}
              value={petAverages[key]}
              analysis={`Promedio acumulado de ${key}`}
              trend={petAverages[key] > recommendedData.find((d) => d.name === key)?.value ? "above" : "below"}
            />
          ))}
        </Slider>
  
        {/* Gráfico Radar */}
        <Box bg="white" p={4} borderRadius="lg" shadow="md" mt={8}>
          <Heading size="sm" mb={4}>
            Comparación de Signos Vitales (Promedio vs Recomendado)
          </Heading>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={recommendedData.map((item, idx) => ({ ...item, value2: actualData[idx]?.value }))}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Tooltip />
              <Legend />
              <Radar name="Recomendado" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Promedio Actual" dataKey="value2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };
  
  export default HealthHistory;