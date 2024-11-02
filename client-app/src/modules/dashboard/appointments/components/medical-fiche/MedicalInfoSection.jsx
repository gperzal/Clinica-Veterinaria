import React from 'react';
import { SimpleGrid, FormControl, FormLabel, Input, Heading,
    InputGroup, InputRightAddon, Select, useColorModeValue, Box
} from '@chakra-ui/react';

const MedicalInfoSection = () => {
    const labelColor = useColorModeValue("teal.600", "teal.300"); // Define el color dinámico para el label

    return (
        <Box as="section" w="full" p={4} borderWidth="1px" borderRadius="lg" bg={useColorModeValue("gray.50", "gray.800")}>
            <Heading size="md" color="teal.500" mb={4}>Información Médica</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {/* Peso y Temperatura */}
                <FormControl>
                    <FormLabel color={labelColor}>Peso</FormLabel>
                    <InputGroup>
                        <Input placeholder="Peso" type="number" />
                        <InputRightAddon children="kg" />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Temperatura</FormLabel>
                    <InputGroup>
                        <Input placeholder="Temperatura" type="number" />
                        <InputRightAddon children="°C" />
                    </InputGroup>
                </FormControl>

                {/* Frecuencia Cardíaca y Respiratoria */}
                <FormControl>
                    <FormLabel color={labelColor}>Frecuencia Cardíaca</FormLabel>
                    <InputGroup>
                        <Input placeholder="Frecuencia" type="number" />
                        <InputRightAddon children="bpm" />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Frecuencia Respiratoria</FormLabel>
                    <InputGroup>
                        <Input placeholder="Respiratoria" type="number" />
                        <InputRightAddon children="rpm" />
                    </InputGroup>
                </FormControl>

                {/* Condición Corporal y Hidratación */}
                <FormControl>
                    <FormLabel color={labelColor}>Índice de Condición Corporal</FormLabel>
                    <Input placeholder="Puntaje 1-9" type="number" min={1} max={9} />
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Nivel de Hidratación</FormLabel>
                    <InputGroup>
                        <Input placeholder="Hidratación" type="number" />
                        <InputRightAddon children="%" />
                    </InputGroup>
                </FormControl>

                {/* Pulso y Presión Arterial */}
                <FormControl>
                    <FormLabel color={labelColor}>Presión Sistólica</FormLabel>
                    <InputGroup>
                        <Input placeholder="Presión Sistólica" type="number" />
                        <InputRightAddon children="mmHg" />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Presión Diastólica</FormLabel>
                    <InputGroup>
                        <Input placeholder="Presión Diastólica" type="number" />
                        <InputRightAddon children="mmHg" />
                    </InputGroup>
                </FormControl>

                {/* Mucosas */}
                <FormControl>
                    <FormLabel color={labelColor}>Color de las Mucosas</FormLabel>
                    <Input placeholder="Color de las Mucosas" />
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Observaciones de Mucosas</FormLabel>
                    <Input placeholder="Observaciones adicionales" />
                </FormControl>

                {/* Actividad y Comportamiento */}
                <FormControl>
                    <FormLabel color={labelColor}>Nivel de Actividad</FormLabel>
                    <Select placeholder="Seleccionar nivel">
                        <option>Sedentario</option>
                        <option>Activo</option>
                        <option>Muy Activo</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Temperamento </FormLabel>
                    <Input placeholder="Describir temperamento" />
                </FormControl>

                {/* Dieta y Hábitos */}
                <FormControl>
                    <FormLabel color={labelColor}>Dieta</FormLabel>
                    <Input placeholder="Ej. alimento seco, húmedo" />
                </FormControl>
                <FormControl>
                    <FormLabel color={labelColor}>Apetito / Digestión</FormLabel>
                    <Input placeholder="Cambios en apetito o digestión" />
                </FormControl>
            </SimpleGrid>
        </Box>
    );
};

export default MedicalInfoSection;
