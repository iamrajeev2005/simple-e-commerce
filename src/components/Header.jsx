import React from "react"
import { SearchIcon, UserIcon, HeartIcon, ShoppingBagIcon, MenuIcon } from "@heroicons/react/outline"

function Header({ cartItemCount, favoriteCount, openCart, searchQuery, setSearchQuery }) {
  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative max-w-[400px]">
              <input
                type="text"
                placeholder="Search Anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-none focus:outline-none transition-colors duration-200 focus:border-blue-500"
              />
              <SearchIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Logo */}
          <h1 className="text-2xl font-bold flex-1 text-center">Helendo</h1>

          {/* Icons */}
          <div className="flex items-center gap-6 flex-1 justify-end">
            <button className="transition-transform duration-200 hover:scale-110">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button className="relative transition-transform duration-200 hover:scale-110">
              <HeartIcon className="h-6 w-6 text-gray-700" />
              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200">
                  {favoriteCount}
                </span>
              )}
            </button>
            <button className="relative transition-transform duration-200 hover:scale-110" onClick={openCart}>
              <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="transition-transform duration-200 hover:scale-110">
              <MenuIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header