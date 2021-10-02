import React, { useState } from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace = false) => {
    //if new mode is not being replaced update history
    if(!replace){  
      history.push(newMode);
      setHistory([...history]);
    } 
    setMode(newMode);   
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setHistory([...history]);
      setMode(history[history.length - 1]);
    }
  };
  return { mode, transition, back };
}
