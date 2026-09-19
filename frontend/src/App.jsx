import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout";
import AnalyzePage from "./pages/AnalyzePage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import LandingPage from "./pages/LandingPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<LandingPage />} /><Route path="/app" element={<AppLayout />}><Route index element={<DashboardPage />} /><Route path="analyze" element={<AnalyzePage />} /><Route path="history" element={<HistoryPage />} /><Route path="saved" element={<HistoryPage savedOnly />} /><Route path="settings" element={<SettingsPage />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter>;
}

export default App;
