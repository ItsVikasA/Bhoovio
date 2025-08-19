import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Construction from './components/Construction';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Construction />} />
    </Routes>
  </Router>
);

export default App;
