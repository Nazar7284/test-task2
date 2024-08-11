import React, { useEffect, useState, useCallback } from "react";
import CustomNavLink from "../../components/NavLink/NavLink";
import TransactionsList from "./components/TransactionsList";

interface Transaction {
  from: string;
  to: string;
  sum: number;
}

const TradingNotificationsPage: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event: any) => {
      const data = JSON.parse(event.data);

      if (data) {
        const newTransactions = data.x.inputs.flatMap((input: any) => {
          return data.x.out.map((output: any) => ({
            from: input.prev_out.addr || "N/A",
            to: output.addr || "N/A",
            sum: output.value / 100000000,
          }));
        });

        setTransactions((prevTransactions) => {
          const updatedTransactions = [...newTransactions, ...prevTransactions];
          const total = updatedTransactions.reduce(
            (acc, tx) => acc + tx.sum,
            0
          );
          setTotalSum(total);
          return updatedTransactions;
        });
      } else {
        console.warn("Invalid data received:", data);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connectWebSocket]);

  const subscribe = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
      console.log("Subscribed to unconfirmed transactions");
    } else {
      console.log("WebSocket is not open or already subscribed");
    }
  };

  const unsubscribe = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
      console.log("Unsubscribed from unconfirmed transactions");
    } else {
      console.log("WebSocket is not open or not subscribed");
    }
  };

  const clearData = () => {
    setTransactions([]);
    setTotalSum(0);
  };

  return (
    <div className="p-6">
      <CustomNavLink to="/">Повернутись на попередню сторінку</CustomNavLink>
      <div className="flex justify-around mt-6">
        <button
          onClick={subscribe}
          className={"px-4 py-2 text-white bg-green-600"}
        >
          Запуск
        </button>
        <button
          onClick={unsubscribe}
          className={"px-4 py-2 text-white bg-red-600"}
        >
          Остановка
        </button>
        <button
          onClick={clearData}
          className={"px-4 py-2 text-white bg-yellow-500"}
        >
          Сброс
        </button>
      </div>
      <div className="text-xl font-bold text-center my-4">
        Сумма: {totalSum.toFixed(8)} BTC
      </div>
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default TradingNotificationsPage;
