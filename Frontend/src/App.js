// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Design from './Design';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/design" element={<Design />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
