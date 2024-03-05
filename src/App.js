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

function App() {
  return (
     <Router>
       <Routes>
         <Route path="/" element={<MainPage />} />
         <Route path="/unzip" element={<UnZip />} />
         <Route path="/t2m" element={<TorrentToMagnet />} />
         <Route path="/m2t" element={<MagnetToTorrent />} />
         <Route path="/rmb" element={<BackgroundRemove />} />
         <Route path="/w2p" element={<WordToPDF />} />
         <Route path="/p2w" element={<PDFToWord />} />
         <Route path="/b64en" element={<Base64Encode />} />
         <Route path="/b64de" element={<Base64Decode />} />
       </Routes>
     </Router>
  );
 }

export default App;
