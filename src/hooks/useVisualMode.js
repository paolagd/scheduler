import { useState } from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace = false) => {
    //if new mode is not being replaced update history
    if (replace) {
      setHistory([...history.slice(0, -1), newMode]);
    } else {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = [...prev].slice(0, -1);
        setMode(newHistory[newHistory.length - 1]);
        return newHistory;
      }
    });
  };

  return { mode, transition, back };
}
