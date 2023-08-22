import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeContextProvider } from './Context/ThemeContext';
import { TestModeContextProvider } from './Context/TestModeContext';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    <ThemeContextProvider>
        <TestModeContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </TestModeContextProvider>
    </ThemeContextProvider>
    , document.getElementById('root'));