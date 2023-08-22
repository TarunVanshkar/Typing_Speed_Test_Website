import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import HomePage from "./Pages/HomePage";
import { GlobalStyles } from "./Styles/global";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import UserPage from "./Pages/UserPage";

function App() {
  const { theme } = useTheme();
  return (
    <div>
      <ThemeProvider theme={theme} >
        <ToastContainer />
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
