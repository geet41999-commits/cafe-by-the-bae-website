/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, CustomizationState, OrderDetails, CategoryId } from './types/cafe';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AtmosphereShowcase } from './components/AtmosphereShowcase';
import { MenuSection } from './components/MenuSection';
import { BakerySection } from './components/BakerySection';
import { RoasterySection } from './components/RoasterySection';
import { BrewGuideLab } from './components/BrewGuideLab';
import { DrinkConfigModal } from './components/DrinkConfigModal';
import { TableReservationModal } from './components/TableReservationModal';
import { CoffeeQuizModal } from './components/CoffeeQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { Footer } from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('common_room_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedItemForConfig, setSelectedItemForConfig] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationZone, setReservationZone] = useState<string | undefined>(undefined);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(null);
  const [activeMenuCategory, setActiveMenuCategory] = useState<CategoryId>('all');

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('common_room_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    item: MenuItem,
    customization: CustomizationState,
    quantity: number
  ) => {
    let unitPrice = item.price;
    if (customization.size === 'Large (16oz)') unitPrice += 0.75;
    if (customization.size === 'Small (8oz)') unitPrice -= 0.50;
    if (
      !item.isBakery &&
      !item.isBean &&
      (customization.milk.includes('Oat') ||
        customization.milk.includes('Almond') ||
        customization.milk.includes('Pistachio'))
    ) {
      unitPrice += 0.60;
    }
    if (customization.syrup !== 'None') unitPrice += 0.75;
    if (customization.extraShot) unitPrice += 1.00;

    const cartId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newItem: CartItem = {
      cartId,
      menuItem: item,
      quantity,
      customization,
      itemTotal: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: singleUnitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromAtmosphere = (categoryId: string) => {
    setActiveMenuCategory(categoryId as CategoryId);
    handleNavigate('menu');
  };

  const handleOpenReservation = (zoneName?: string) => {
    setReservationZone(zoneName);
    setIsReservationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#241A14] flex flex-col font-sans selection:bg-[#EAE0D1] selection:text-[#261C14]">
      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleOpenReservation()}
        onOpenQuiz={() => setIsQuizOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main App Screens */}
      <main className="flex-1">
        {/* 1. Hero Experience */}
        <HeroSection
          onExploreMenu={() => handleNavigate('menu')}
          onReserveTable={() => handleOpenReservation()}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 2. Visual Atmosphere & Seating Guide (Features all 4 scenes from user photos) */}
        <AtmosphereShowcase
          onReserveTable={handleOpenReservation}
          onSelectCategory={handleSelectCategoryFromAtmosphere}
        />

        {/* 3. Daily Menu & Seasonal Roasts with Filters */}
        <MenuSection
          onSelectItem={(item) => setSelectedItemForConfig(item)}
          activeFilter={activeMenuCategory}
          onFilterChange={(cat) => setActiveMenuCategory(cat)}
        />

        {/* 4. Bakehouse & Patisserie */}
        <BakerySection
          onSelectItem={(item) => setSelectedItemForConfig(item)}
        />

        {/* 5. Whole Bean Roastery & Retail */}
        <RoasterySection
          onSelectItem={(item) => setSelectedItemForConfig(item)}
        />

        {/* 6. Interactive Brew Guide Lab */}
        <BrewGuideLab />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <DrinkConfigModal
        item={selectedItemForConfig}
        onClose={() => setSelectedItemForConfig(null)}
        onAddToCart={handleAddToCart}
      />

      <TableReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        defaultZoneName={reservationZone}
      />

      <CoffeeQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectRecommendedItem={(item) => setSelectedItemForConfig(item)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={(order) => setLatestOrder(order)}
      />

      <CheckoutSuccessModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
      />
    </div>
  );
}
