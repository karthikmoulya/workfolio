import React, { useEffect, useState } from 'react';

import './paginationPage.css';

export default function PaginationPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalpages] = useState(0);

  const fecthProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalpages(data.total);
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages / 10 &&
      page !== selectedPage
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fecthProducts();
  }, [page]);

  return (
    <div>
      {products.length > 0 && (
        <div className='products'>
          {products.map((product) => {
            return (
              <span className='products__single' key={product.id}>
                <img src={product.thumbnail} alt={product.thumbnail} />
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
          {[...Array(totalPages / 10)].map((_, i) => (
            <span
              key={i + 1}
              className={page === i + 1 ? 'pagination__selected' : ''}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          {page < totalPages / 10 && (
            <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
          )}
        </div>
      )}
    </div>
  );
}
