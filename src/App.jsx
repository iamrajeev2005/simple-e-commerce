import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import ProductList from "./components/ProductList"
import Cart from "./components/Cart"

function App() {
  // State management
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Apply search and sorting when query or sort method changes
  useEffect(() => {
    handleSearch(searchQuery)
  }, [searchQuery]) // Removed unnecessary sortBy dependency

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://interview.gdev.gosbfy.com/api/collections/Products/records")
      const data = await response.json()
      setProducts(data.items)
      setFilteredProducts(data.items)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Handle search and sorting
  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.Name.toLowerCase().includes(query.toLowerCase()) ||
        product.Category.toLowerCase().includes(query.toLowerCase()) ||
        product.tag.toLowerCase().includes(query.toLowerCase()),
    )

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.Price - b.Price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.Price - a.Price)
        break
      case "name-a-z":
        filtered.sort((a, b) => a.Name.localeCompare(b.Name))
        break
      case "name-z-a":
        filtered.sort((a, b) => b.Name.localeCompare(a.Name))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  // Add product to cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item,
        ),
      )
    } else {
      setCart([...cart, { ...product, quantity: product.quantity || 1 }])
    }
  }

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  // Update cart item quantity
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Toggle product favorite status
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId))
    } else {
      setFavorites([...favorites, productId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favoriteCount={favorites.length}
        openCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className="container mx-auto px-4 py-8 mt-20">
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </main>
      <Cart
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateCartQuantity}
      />
    </div>
  )
}

export default App