import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';

const loadKakaoMapScript = () => {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services&autoload=false`;
  script.async = true;
  document.head.appendChild(script);
};

const Root = () => {
  useEffect(() => {
    loadKakaoMapScript();
  }, []);

  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

