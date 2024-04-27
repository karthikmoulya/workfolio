import React, { useEffect, useState } from 'react';

import './paginationPage.css';

export default function PaginationPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total);
    }
  };

  const selectPageHandler = (seletedPage) => {
    if (
      seletedPage > 0 &&
      seletedPage <= totalPages / 10 &&
      page !== seletedPage
    ) {
      setPage(seletedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      {products.length > 0 && (
        <div className='products'>
          {products.map((product) => {
            return (
              <span key={product.id} className='products__single'>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className='pagination'>
          {page > 1 && (
            <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          )}
          {[...Array(totalPages / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? 'pagination__selected' : ''}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          {page < totalPages / 10 && (
            <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
          )}
        </div>
      )}
    </div>
  );
}
