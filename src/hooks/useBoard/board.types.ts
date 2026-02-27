import { Board } from "@/types/board.types";
import { BoardActionType } from "./board.actions";

export type BoardAction =
  | {
      type: BoardActionType.UPDATE_BOARD_TITLE;
      payload: string;
    }
  | {
      type: BoardActionType.ADD_LIST;
      payload: { title: string };
    }
  | { type: BoardActionType.DELETE_LIST; payload: { listId: string } }
  | {
      type: BoardActionType.UPDATE_LIST_TITLE;
      payload: { listId: string; title: string };
    }
  | {
      type: BoardActionType.MOVE_LIST;
      payload: { fromIndex: number; toIndex: number };
    }
  | {
      type: BoardActionType.ADD_CARD;
      payload: {
        title: string;
        listId: string;
      };
    }
  | {
      type: BoardActionType.DELETE_ALL_CARDS;
      payload: {
        listId: string;
      };
    }
  | {
      type: BoardActionType.UPDATE_CARD_TITLE;
      payload: {
        listId: string;
        cardId: string;
        title: string;
      };
    }
  | {
      type: BoardActionType.MOVE_CARD;
      payload: {
        fromListId: string;
        toListId: string;
        fromIndex: number;
        toIndex: number;
      };
    }
  | {
      type: BoardActionType.ADD_COMMENT;
      payload: {
        listId: string;
        cardId: string;
        text: string;
      };
    };

export type BoardState = Board;
