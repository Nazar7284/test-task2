import React from "react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import PublicRoute from "./routes";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Завантаження...</div>}>
        <PublicRoute />
      </Suspense>
    </Router>
  );
};

export default App;
