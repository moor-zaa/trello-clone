import { BoardActionType } from "./board.actions";
import { BoardAction, BoardState } from "./board.types";
import { v4 as uuid } from "uuid";

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    // ===Board===
    case BoardActionType.UPDATE_BOARD_TITLE:
      return { ...state, title: action.payload };

    // ===List===
    case BoardActionType.ADD_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: uuid(),
            title: action.payload.title,
            cards: [],
          },
        ],
      };

    case BoardActionType.DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload.listId),
      };

    case BoardActionType.UPDATE_LIST_TITLE:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? { ...list, title: action.payload.title }
            : list,
        ),
      };

    case BoardActionType.MOVE_LIST:
      const lists = [...state.lists];
      const [removed] = lists.splice(action.payload.fromIndex, 1);
      lists.splice(action.payload.toIndex, 0, removed);

      return { ...state, lists };
    default:
      return state;
  }
}
