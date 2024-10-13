// src/modules/dashboard/catalog/hooks/usePagination.js

import { useState, useEffect } from 'react';

const usePagination = (items, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginateItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = items.slice(startIndex, startIndex + itemsPerPage);
    setPaginatedItems(paginated);
  };

  useEffect(() => {
    paginateItems();
    // eslint-disable-next-line
  }, [items, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
  };
};

export default usePagination;