import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import theme from './theme';
// import { ThemeProvider } from '@mui/material/styles';
import MainPage from './MainPage';
import UnZip from './services/UnZip';
import BackgroundRemove from './services/BackgroundRemove';
import TorrentToMagnet from './services/TorrentToMagnet';
import MagnetToTorrent from './services/MagnetToTorrent';
import WordToPDF from './services/WordToPDF';
import PDFToWord from './services/PDFToWord';
import Base64Encode from './services/Base64Encode';
import Base64Decode from './services/Base64Decode';
import Layout from './Layout';

function App() {
  return (
     <Router>
       <Routes>
         <Route path="/" element={<Layout><MainPage /></Layout>} />
         <Route path="/unzip" element={<Layout><UnZip /></Layout>} />
         <Route path="/t2m" element={<Layout><TorrentToMagnet /></Layout>} />
         <Route path="/m2t" element={<Layout><MagnetToTorrent /></Layout>} />
         <Route path="/rmb" element={<Layout><BackgroundRemove /></Layout>} />
         <Route path="/w2p" element={<Layout><WordToPDF /></Layout>} />
         <Route path="/p2w" element={<Layout><PDFToWord /></Layout>} />
         <Route path="/b64en" element={<Layout><Base64Encode /></Layout>} />
         <Route path="/b64de" element={<Layout><Base64Decode /></Layout>} />
       </Routes>
     </Router>
  );
 }

export default App;
