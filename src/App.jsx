import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import "tailwindcss";
import Home from './Pages/Home';
import Header from './components/Header';
import { ThemeContext } from './Context/ThemeContext';
import { VisibilityProvider } from './Context/VisibilityContext';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark');
  }, []);

  return (
    <VisibilityProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme} ${theme == 'dark' ? 'bg-[#121212]' : null} min-h-[100vh]`}>
          <Home />
        </div>
      </ThemeContext.Provider>
    </VisibilityProvider>
  );
}



export default App;