// src/pages/CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      You can fetch and display products based on categoryName here
    </div>
  );
}

export default CategoryPage;
