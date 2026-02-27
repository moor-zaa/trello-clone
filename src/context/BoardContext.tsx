"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { defaultBoard } from "@/services/board.service";
import { boardReducer } from "@/hooks/useBoard/board.reducer";
import { BoardState } from "@/hooks/useBoard/board.types";

interface BoardContextType {
  board: BoardState;
  dispatch: React.Dispatch<any>;
}

export const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const initializer = (): BoardState => {
    if (typeof window === "undefined") return defaultBoard;
    const stored = localStorage.getItem("board");
    return stored ? JSON.parse(stored) : defaultBoard;
  };

  const [state, dispatch] = useReducer(boardReducer, defaultBoard, initializer);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ board: state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}


