import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import WelcomePage from "./pages/WelcomePage";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import CityDetailsPage from "./pages/CityDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/app/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard/" element={<DashboardPage />} />
            <Route path="search/" element={<SearchPage />} />
            <Route path="city/:cityName" element={<CityDetailsPage />} />
            <Route path="favorites/" element={<FavoritesPage />} />
            <Route path="compare/" element={<ComparePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
