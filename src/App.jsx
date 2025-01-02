import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { IdolProvider } from "./components/ContextApi/IdolContext.jsx";
import { AuthProvider } from "./components/ContextApi/AuthContext.jsx";

//import Heading from "./components/Navbar/heading.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./components/Home/Home.jsx";
import Content from "./components/Container/IdolCardsList.jsx";
import Login from "./components/Authentication/Login.jsx";
import Signup from "./components/Authentication/Signup.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Order from "./components/Order/Order.jsx";
import Idoldetails from "./components/Productfeature/Idoldetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
//import Sidebar from "./components/Navbar/Sidebar.jsx";
import "./index.css";
import UserProfile from "./components/Navbar/UserProfile.jsx";
import AddAddress from "./components/Order/AddAddress.jsx";
import CheckAddress from "./components/Order/CheckAddress.jsx";
import PlaceOrder from "./components/Order/PlaceOrder.jsx";

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname == "/login";
  const isSignup = location.pathname == "/signup";
  const isHome = location.pathname == "/";
  const authPage = isLogin || isSignup || isHome;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/explore" element={<Content />} />
          <Route path="/idoldetails/:pid" element={<Idoldetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/address/:pid" element={<CheckAddress />} />
          <Route path="/add_address/:pid" element={<AddAddress />} />
          <Route path="/place_order/:pid" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <IdolProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </IdolProvider>
    </BrowserRouter>
  );
}

export default App;
