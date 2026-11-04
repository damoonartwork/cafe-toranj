/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryNavigation } from './components/CategoryNavigation';
import { PopularSection } from './components/PopularSection';
import { ProductGrid } from './components/ProductGrid';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { ShoppingCartDrawer } from './components/ShoppingCartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ToastNotification } from './components/ToastNotification';
import { Product } from './types';

const MainContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { selectedProduct, setSelectedProduct } = useCart();

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMenu = () => {
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dot-pattern text-[var(--text-primary)] selection:bg-[var(--accent)]/25 selection:text-[var(--accent)] transition-colors duration-300">
      {/* Sticky Header with navigation & cart counter */}
      <Header />

      {/* Hero Section */}
      <HeroSection onExploreMenu={handleExploreMenu} />

      {/* Sticky Category Bar */}
      <CategoryNavigation
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Popular Products Section */}
      <PopularSection onOpenDetails={(p: Product) => setSelectedProduct(p)} />

      {/* Full Menu Product Grid with Search & Sort */}
      <ProductGrid
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenDetails={(p: Product) => setSelectedProduct(p)}
      />

      {/* Story & Atmosphere Section */}
      <StorySection />

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Modals & Overlays */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ShoppingCartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ThemeProvider>
  );
}
