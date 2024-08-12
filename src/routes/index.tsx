import React from "react";
import { Route, Routes } from "react-router-dom";
const TradingDeskPage = React.lazy(() => import("../pages/TradingDeskPage"));
const TradingNotificationsPage = React.lazy(
  () => import("../pages/TradingNotifications/TradingNotificationsPage")
);
const MainPage = React.lazy(() => import("../pages/MainPage"));

function PublicRoute() {
  return (
    <Routes>
      <Route path="/trading-desk" element={<TradingDeskPage />} />
      <Route
        path="/trading-notifications"
        element={<TradingNotificationsPage />}
      />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default PublicRoute;
