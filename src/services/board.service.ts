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
        {
          id: "card-2",
          title: "Setup Next js",
          comments: [],
        },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: [],
    },
  ],
};
