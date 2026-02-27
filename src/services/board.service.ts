import { Board } from "@/types/board.types";

export const defaultBoard: Board = {
  id: "board-1",
  title: "Demo Board",
  lists: [
    {
      id: "list-1",
      title: "To Do",
      cards: [
        {
          id: "card-1",
          title: "Build Trello Clone",
          comments: [],
        },
      ],
    },
  ],
};
