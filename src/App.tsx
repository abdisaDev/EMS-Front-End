// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Signup from "./pages/SIgnup/Signup.page";
import Homepage from "./pages/Homepage/Home.page";
import { Routes, Route } from "react-router-dom";
import Profilepage from "./pages/Profilepage/Profile.page";
import ScanOrRegister from "./pages/Scan_or_registerpage/ScanOrRegister.page";
import Scan from "./pages/Scanpage/Scan.page";
import Signin from "./pages/Signinpage/Signin.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profilepage />} />
      <Route path="/scanorregister" element={<ScanOrRegister />} />
      <Route path="/scan" element={<Scan />} />
    </Routes>
  );
}

export default App;
