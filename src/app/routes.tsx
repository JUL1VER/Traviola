import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HotelsPage from "../pages/hotels/HotelsPage";
import SearchPage from "../pages/search/SearchPage";
import Header from "../components/layout/header/Header";

export const AppRoutes = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/hotels" element={<HotelsPage />} />
    </Routes>
  </Router>
);
