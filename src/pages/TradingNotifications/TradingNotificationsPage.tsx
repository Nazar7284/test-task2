import React from "react";
import CustomNavLink from "../../components/NavLink/NavLink";
import TransactionsList from "./components/TransactionsList";
import { useWebSocket } from "../../socket";
import MyBtn from "../../components/Button";

export interface Transaction {
  from: string;
  to: string;
  sum: number;
}

const TradingNotificationsPage: React.FC = () => {
  const {
    transactions,
    totalSum,
    connection,
    subscribe,
    unsubscribe,
    clearData,
  } = useWebSocket();

  return (
    <div className="p-6">
      <CustomNavLink to="/">Повернутись на попередню сторінку</CustomNavLink>
      <div className="flex justify-around mt-6">
        <MyBtn
          onClick={subscribe}
          isDisabled={!connection}
          label="Запуск"
          color="bg-green-600"
        />
        <MyBtn
          onClick={unsubscribe}
          isDisabled={!connection}
          label="Остановка"
          color="bg-red-600"
        />
        <MyBtn
          onClick={clearData}
          isDisabled={!connection}
          label="Сброс"
          color="bg-yellow-500"
        />
      </div>
      <div className="text-xl font-bold text-center my-4">
        Сумма: {totalSum.toFixed(8)} BTC
      </div>
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default TradingNotificationsPage;
