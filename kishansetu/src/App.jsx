import { Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import FarmerSpotlightSection from "./components/FarmerSpotlightSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FarmerDashboardPage from "./components/Dashboard/FarmerDashboardPage";
import BuyerShopPage from "./components/Dashboard/pages/BuyerShopPage";
import FarmerPublicProfile from "./components/Dashboard/pages/FarmerPublicProfile";
import BuyerProfile from "./components/Dashboard/pages/BuyerProfile"; // <-- ADD THIS LINE
import ProtectedRoute from "./components/ProtectedRoute";              // <-- ADD THIS LINE
import AddProduct from "./components/Dashboard/AddProduct";

// Home Page (combine sections)
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <FarmerSpotlightSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>


      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* PROTECTED ROUTES */}


      <Route
        path="/seller/dashboard"
        element={<ProtectedRoute allowedRoles={['seller']}><FarmerDashboardPage /></ProtectedRoute>}
      />

      <Route
        path="/buyer/shop"
        element={<ProtectedRoute allowedRoles={['buyer']}><BuyerShopPage /></ProtectedRoute>}
      />

      {/* ADD THIS ROUTE 👇 */}
      <Route
        path="/buyer/profile"
        element={<ProtectedRoute allowedRoles={['buyer']}><BuyerProfile /></ProtectedRoute>}
      />

      <Route
        path="/buyer/farmer/:id"
        element={<ProtectedRoute allowedRoles={['buyer']}><FarmerPublicProfile /></ProtectedRoute>}
      />

      <Route
        path="/add-product"
        element={<ProtectedRoute allowedRoles={['seller']}><AddProduct /></ProtectedRoute>}
      />
    </Routes>
  );
}

{/* <Route path="/dashboard/add-product" element={<AddProduct />} /> */ }

export default App;