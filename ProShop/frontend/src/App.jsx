import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./components/Screens/HomeScreen";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProjectScreen from "./components/Screens/ProjectScreen";
import { Login } from "../src/components/Screens/Login";
import CartScreen from "./components/Screens/CartScreen";
import { RegisterScreen } from "./components/Screens/RegisterScreen";
import { ProfileScreen } from "./components/Screens/ProfileScreen";
import ShippingScreen from "./components/Screens/ShippingScreen";
import PaymentScreen from "./components/Screens/PaymentScreen";
import PlaceOrderScreen from "./components/Screens/PlaceOrderScreen";
import Products from "./components/Screens/Products";
import { GetOrderDetails } from "../src/components/Screens/OrderScreen";
import UserListScreen from "./components/Screens/UserListScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/order/:id" element={<GetOrderDetails />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/:id" element={<ProjectScreen />} />
              <Route path="/project/:id" element={<ProjectScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/admin/userlist" element={<UserListScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
