import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
const TradingDeskPage = React.lazy(() => import("./pages/TradingDeskPage"));
const TradingNotificationsPage = React.lazy(
  () => import("./pages/TradingNotifications/TradingNotificationsPage")
);
const MainPage = React.lazy(() => import("./pages/MainPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Routes>
          <Route path="/trading-desk" element={<TradingDeskPage />} />
          <Route
            path="/trading-notifications"
            element={<TradingNotificationsPage />}
          />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
