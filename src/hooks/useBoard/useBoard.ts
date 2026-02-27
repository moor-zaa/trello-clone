"use client";

import { defaultBoard } from "@/services/board.service";
import { BoardState } from "./board.types";
import { useEffect, useReducer } from "react";
import { boardReducer } from "./board.reducer";

export const useBoard = () => {
  const initializer = (): BoardState => {
    if (typeof window === "undefined") return defaultBoard;
    const stored = localStorage.getItem("board");
    return stored ? JSON.parse(stored) : defaultBoard;
  };

  const [state, dispatch] = useReducer(boardReducer, defaultBoard, initializer);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return {
    board: state,
    dispatch,
  };
};
