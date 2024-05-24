import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CampaignDetail from './pages/CampaignDetail';
import CampaignForm from './pages/CampaignForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import MarketRegistrationForm from './pages/MarketRegistrationForm';
import MarketListPage from './pages/MarketListPage';
import MarketManagePage from './pages/MarketManagePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

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
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
