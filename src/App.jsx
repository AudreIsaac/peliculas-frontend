import Header from "./components/Header";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PeliculaList from "./pages/PeliculaList";
import PeliculaForm from "./components/PeliculaForm";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PeliculaList />} />
            <Route path="/add" element={<PeliculaForm />} />
            <Route path="/edit/:id" element={<PeliculaForm />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App