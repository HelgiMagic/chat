import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import NotFoundPage from "./components/NotFoundPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='404' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
