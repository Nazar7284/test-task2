import React from "react";
import CustomNavLink from "../components/NavLink/NavLink";

function MainPage() {
  return (
    <div>
      <h2 className="my-4 text-center font-bold text-xl">Головна сторінка</h2>
      <div className="flex gap-4 justify-center">
        <CustomNavLink to="trading-desk">Task1</CustomNavLink>
        <CustomNavLink to="trading-notifications">Task2</CustomNavLink>
      </div>
    </div>
  );
}

export default MainPage;
