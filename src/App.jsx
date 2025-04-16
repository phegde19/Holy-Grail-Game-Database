import { useEffect, useState } from 'react';
import './App.css';
import "tailwindcss";
import Home from './Pages/Home';
import Login from './components/Login'; // ✅ import Login component
import { ThemeContext } from './Context/ThemeContext';
import { VisibilityProvider } from './Context/VisibilityContext';
import { Routes, Route } from 'react-router-dom';
import Lists from './Pages/Lists';

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null); // ✅ manage login state

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme || 'dark');
  }, []);

  return (
    
      <VisibilityProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className={`${theme} ${theme === 'dark' ? 'bg-[#121212]' : null} min-h-[100vh]`}>
            {user ? (
              <Routes>
                <Route path="/" element={<Home username={user} onLogout={() => setUser(null)} />} />
                <Route path="/lists" element={<Lists username={user} />} />
              </Routes>
            ) : (
              <Login onLogin={(username) => setUser(username)} />
            )}
          </div>
        </ThemeContext.Provider>
      </VisibilityProvider>
    
  );
}

export default App;
