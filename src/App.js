import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import theme from './theme';
// import { ThemeProvider } from '@mui/material/styles';
import MainPage from './MainPage';
import UnZip from './UnZip';
import BackgroundRemove from './BackgroundRemove';

function App() {
  return (
     <Router>
       <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/unzip" element={<UnZip />} />
         <Route path="/t2m" element={<UnZip />} />
         <Route path="/rmb" element={<BackgroundRemove />} />
       </Routes>
     </Router>
  );
 }

export default App;
