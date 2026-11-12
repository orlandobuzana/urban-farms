'use client';

import React from 'react';
import { StoreProvider } from '../context/StoreContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CsaSection from '../components/CsaSection';
import MarketSection from '../components/MarketSection';
import FulfillmentSelector from '../components/FulfillmentSelector';
import ImpactTracker from '../components/ImpactTracker';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import SubscriptionPortalModal from '../components/SubscriptionPortalModal';
import AdminModal from '../components/AdminModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#090a0b] text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
        <Navbar />
        <main className="flex-1 bg-tech-grid">
          <Hero />
          <CsaSection />
          <MarketSection />
          <FulfillmentSelector />
          <ImpactTracker />
        </main>
        <Footer />

        {/* Drawers, Modals & Floating Notifications */}
        <CartDrawer />
        <CheckoutModal />
        <SubscriptionPortalModal />
        <AdminModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}
