import React, { useState } from "react"
import { ViewGridIcon, ViewListIcon, DotsHorizontalIcon } from "@heroicons/react/solid"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"

function ProductList({ products, addToCart, favorites, toggleFavorite, sortBy, setSortBy }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openProductModal = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">
          Showing {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 px-3 py-2">
            <span className="mr-2 text-sm">Sort by:</span>
            <select
              className="border-none bg-transparent focus:outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            isFavorite={favorites.includes(product.id)}
            toggleFavorite={() => toggleFavorite(product.id)}
            openProductModal={() => openProductModal(product)}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
        isFavorite={favorites.includes(selectedProduct?.id)}
        toggleFavorite={() => selectedProduct && toggleFavorite(selectedProduct.id)}
      />
    </div>
  )
}

export default ProductList