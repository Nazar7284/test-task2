import React from "react";
import BlockContainer from "../components/BlockContainer/BlockContainer";
import { NavLink } from "react-router-dom";
import CustomNavLink from "../components/NavLink/NavLink";

function TradingDeskPage() {
  return (
    <div className="flex gap-2 flex-col">
      <CustomNavLink to="/">Перейти назад</CustomNavLink>
      <BlockContainer />
    </div>
  );
}

export default TradingDeskPage;
