import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Casino from "./Casino"; // Import Casino component
import TermsOfUse from "./pages/TermsOfUse";
import PrivatePolicy from "./pages/PrivatePolicy";
import Documentation from "./pages/Documentation";
import MarketingService from "./pages/MarketingService";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Casino />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivatePolicy />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/marketing" element={<MarketingService />} />
      </Routes>
    </BrowserRouter>
  );
}