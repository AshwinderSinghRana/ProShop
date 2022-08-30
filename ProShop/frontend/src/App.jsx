import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./components/Screens/HomeScreen";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProjectScreen from "./components/Screens/ProjectScreen";
import Login from "./components/Screens/Login";

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
              <Route path="/" element={<HomeScreen />} />
              <Route path="/:id" element={<ProjectScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
