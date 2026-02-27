"use client"

import { Board } from "@/types/board.types";
import { useLocalStorage } from "./useLocalStorage";
import { defaultBoard } from "@/services/board.service";
import { v4 as uuid } from "uuid";

export const useBoard = () => {
  const [board, setBoard] = useLocalStorage<Board>("board", defaultBoard);

  //   ===Board===
  const updateBoardTitle = (title: string) => {
    setBoard({ ...board, title });
  };

  //   ===List===
  const addList = (title: string) => {
    const newList = {
      id: uuid(),
      title,
      cards: [],
    };

    setBoard({ ...board, lists: [...board.lists, newList] });
  };

  const deleteList = (listId: string) => {
    setBoard({
      ...board,
      lists: board.lists.filter((list) => list.id === listId),
    });
  };

  const updateListTitle = (listId: string, newTitle: string) => {
    setBoard({
      ...board,
      lists: board.lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list,
      ),
    });
  };

  return {
    board,
    updateBoardTitle,
    addList,
    deleteList,
    updateListTitle,
  };
};
