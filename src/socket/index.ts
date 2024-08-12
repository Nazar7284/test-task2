import { useState, useEffect, useCallback } from "react";

export interface Transaction {
  from: string;
  to: string;
  sum: number;
}

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [connection, setConnection] = useState<boolean>(false);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket("wss://ws.blockchain.info/inv");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setConnection(true);
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
      setConnection(false);
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

  return {
    transactions,
    totalSum,
    connection,
    subscribe,
    unsubscribe,
    clearData,
  };
};
