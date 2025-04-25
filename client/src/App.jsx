// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import CountryNews from "./components/CountryNews";
import SavedNews from "./components/SavedNews"; 
import AboutUs from "./components/AboutUs";
import Login from './pages/Login'; 
import WeatherNews from './WeatherNews';
import Register from "./pages/Register";
import { HeaderVisibilityProvider, useHeaderVisibility } from './context/HeaderVisibilityContext'; // Import context

function App() {
  return (
    <div className="w-full">
      <HeaderVisibilityProvider>
        <BrowserRouter>
          <HeaderWithVisibility />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/All-News" element={<AllNews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/top-headlines/:category" element={<TopHeadlines />} />
            <Route path="/country/:iso" element={<CountryNews />} />
            <Route path="/saved-news" element={<SavedNews />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/weather" element={<WeatherNews />} />
          </Routes>
        </BrowserRouter>
      </HeaderVisibilityProvider>
    </div>
  );
}

const HeaderWithVisibility = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  return isHeaderVisible ? <Header /> : null;
};

export default App;
