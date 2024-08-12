import React from "react";
import { Transaction } from "../TradingNotificationsPage";

interface ITransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<ITransactionsListProps> = ({
  transactions,
}) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr className="w-full bg-gray-100 border-b border-gray-200">
          <th className="border-2 border-black text-center">From</th>
          <th className="border-2 border-black text-center">To</th>
          <th className="border-2 border-black text-center">Sum</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="border-b border-gray-200">
            <td className="border-2 border-black text-center">
              {transaction.from}
            </td>
            <td className="border-2 border-black text-center">
              {transaction.to}
            </td>
            <td className="border-2 border-black text-center">
              {transaction.sum.toFixed(8)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;
