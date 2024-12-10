import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Input,
  Flex,
  useDisclosure,
  Button,
  SimpleGrid,
  Text,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { orderService } from '../services/orderService.js';
import OrderCard from '../components/OrderCard';
import OrderModal from '../components/OrderModal';
import DateRangePicker from '../components/DateRangePicker';

const PurchaseHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getUserOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: 'Error al cargar pedidos',
          description: 'No se pudieron cargar tus pedidos. Por favor, intenta de nuevo más tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchOrders();
  }, [toast]);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate =
        dateRange.startDate && dateRange.endDate
          ? new Date(order.createdAt) >= dateRange.startDate &&
            new Date(order.createdAt) <= dateRange.endDate
          : true;
      return matchesSearch && matchesDate;
    });
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, dateRange, orders]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box p={4} maxWidth="1200px" margin="0 auto">
       <Heading fontSize="2xl" fontWeight="bold" mb={4}>
       Historial de Compras
        </Heading>
      <Flex
        mb={8}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
        alignItems={{ base: 'stretch', md: 'center' }}
        justifyContent="space-between"
      >
        {/* Input de búsqueda */}
        <Flex
          flex={1}
          alignItems="center"
          gap={2}
          w="100%"
          maxW={{ base: '100%', md: '48%' }}
          flexWrap="wrap"
        >
          <Icon as={FaSearch} color="gray.500" />
          <Input
            flex={1}
            placeholder="Buscar por ID de Pedido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
          />
        </Flex>

        {/* Selector de rango de fechas */}
        <Flex
          flex={1}
          alignItems="center"
          gap={2}
          w="100%"
          maxW={{ base: '100%', md: '48%' }}
          flexWrap="wrap"
        >
          <Icon as={FaCalendarAlt} color="gray.500" />
          <Box flex={1} maxW={{ base: '100%', md: '48%', lg: '60%' }}>
            <DateRangePicker onDateRangeChange={setDateRange} />
          </Box>
        </Flex>
      </Flex>

      {/* Contenido principal */}
      {filteredOrders.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.500">
          No se encontraron pedidos que coincidan con tu búsqueda.
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {currentOrders.map((order) => (
              <OrderCard key={order._id} order={order} onClick={() => handleOrderClick(order)} />
            ))}
          </SimpleGrid>
          <Flex justifyContent="center" mt={8}>
            {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
              <Button
                key={i}
                mx={1}
                onClick={() => paginate(i + 1)}
                colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}
              >
                {i + 1}
              </Button>
            ))}
          </Flex>
        </>
      )}
      <OrderModal isOpen={isOpen} onClose={onClose} order={selectedOrder} />
    </Box>
  );
};

export default PurchaseHistoryPage;
