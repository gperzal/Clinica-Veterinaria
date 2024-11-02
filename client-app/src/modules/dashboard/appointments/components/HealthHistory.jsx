import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const HealthHistory = () => {
    return (
        <Box>
            {/* 
            Descripción: Este menú tomará los datos de Ficha Clínica y mostrará gráficos históricos de parámetros médicos importantes como peso, vacunas, y otros indicadores de salud.

            Características:
            - Gráfico de Evolución del Peso: Cada vez que se guarde la ficha médica, registra automáticamente el peso y genera un gráfico de línea o de área.
            - Estado de Vacunas: Una línea de tiempo o gráfico de barras que muestra las fechas de vacunación anteriores y las próximas dosis programadas.
            - Panel de Observaciones Clave: Muestra indicadores de salud adicionales, como el índice de condición corporal o la frecuencia cardíaca, anotados en cada visita médica.

            Tecnologías sugeridas: 
            - Utilizar librerías como react-chartjs-2 o recharts para gráficos interactivos.
            - El gráfico de evolución del peso podría representarse con un gráfico de líneas, mientras que el estado de vacunas podría implementarse como una línea de tiempo o gráfico de barras para facilitar la visualización del historial.
            */}

            <Text>Historial de Salud</Text>
        </Box>
    );
};

export default HealthHistory;
