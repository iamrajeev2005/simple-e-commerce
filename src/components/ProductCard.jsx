import React, { useState } from "react"
import { PlusIcon, ShoppingBagIcon, HeartIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/solid"

function ProductCard({ product, addToCart, isFavorite, toggleFavorite, openProductModal }) {
  const [isHovered, setIsHovered] = useState(false)
  const imageUrl = `https://interview.gdev.gosbfy.com/api/files/${product.collectionId}/${product.id}/${product.image}`

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="aspect-square relative bg-gray-100">
        <img src={imageUrl || "/placeholder.svg"} alt={product.Name} className="w-full h-full object-cover" />

        {/* Hover Actions */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-60" : "opacity-0"
          }`}
        >
          <button
            onClick={() => openProductModal(product)}
            className="w-10 z-[1000] relative h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="w-10 h-10 z-[1000] relative rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            <ShoppingBagIcon className="h-5 w-5" />
          </button>
          <button
            onClick={toggleFavorite}
            className="w-10 h-10 z-[1000] relative rounded-full bg-white flex items-center justify-center hover:bg-gray-100"
          >
            {isFavorite ? <HeartSolidIcon className="h-5 w-5 text-red-500" /> : <HeartIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-gray-900 font-medium">{product.Name}</h3>
        <p className="mt-1 text-gray-900">${product.Price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ProductCard