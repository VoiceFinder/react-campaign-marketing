import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import BizHeader from './components/common/BizHeader';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CampaignDetail from './pages/campaign/CampaignDetail';
import CampaignForm from './pages/campaign/CampaignForm';
import CampaignListPage from './pages/campaign/CampaignListPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import MarketRegistrationForm from './pages/market/MarketRegistrationForm';
import MarketListPage from './pages/market/MarketListPage';
import MarketManagePage from './pages/market/MarketManagePage';
import BizPage from './pages/biz/BizPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/biz/*" element={<BizRoutes />} />
          <Route path="/*" element={<GeneralRoutes />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

function BizRoutes() {
  return (
    <>
      <BizHeader />
      <Routes>
        <Route path="/" element={<BizPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/markets" element={<MarketListPage />} />
        <Route path="/register-market" element={<MarketRegistrationForm />} />
        <Route path="/market/:marketId/manage" element={<MarketManagePage />} />
        <Route path="/market/:marketId/create-campaign" element={<CampaignForm />} />
        <Route path="/campaign/:campaignId" element={<CampaignDetail />} />
      </Routes>
    </>
  );
}

function GeneralRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/campaigns" element={<CampaignListPage />} />
        <Route path="/campaign/:campaignId" element={<CampaignDetail />} />
      </Routes>
    </>
  );
}

export default App;
