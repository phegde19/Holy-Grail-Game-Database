import { useEffect, useState } from 'react';
import './App.css';
import "tailwindcss";
import Home from './Pages/Home';
import Login from './components/Login'; // ✅ import Login component
import { ThemeContext } from './Context/ThemeContext';
import { VisibilityProvider } from './Context/VisibilityContext';

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
          {/* ✅ Conditional rendering based on login */}
          {user ? (
            <Home username={user} />
          ) : (
            <Login onLogin={(username) => setUser(username)} />
          )}
        </div>
      </ThemeContext.Provider>
    </VisibilityProvider>
  );
}

export default App;
