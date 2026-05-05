import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import { useState, useEffect } from "react";

function App() {

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    setTheme("dark");
  } else {
    setTheme("light");   // ✅ default light
  }
}, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar toggleTheme={toggleTheme} theme={theme}/>
      <Routes>
        <Route path='/' element={<AllPosts theme={theme}/>}/>
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;