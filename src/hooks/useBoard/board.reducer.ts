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

    // ===Card===
    case BoardActionType.ADD_CARD:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: [
                  ...list.cards,
                  {
                    id: uuid(),
                    title: action.payload.title,
                    comments: [],
                  },
                ],
              }
            : list,
        ),
      };

    case BoardActionType.DELETE_CARD:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: list.cards.filter(
                  (card) => card.id !== action.payload.cardId,
                ),
              }
            : list,
        ),
      };

    case BoardActionType.UPDATE_CARD_TITLE:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === action.payload.cardId
                    ? { ...card, title: action.payload.title }
                    : card,
                ),
              }
            : list,
        ),
      };

    case BoardActionType.MOVE_CARD:
      const { fromIndex, fromListId, toIndex, toListId } = action.payload;

      const fromList = state.lists.find((list) => list.id === fromListId);
      const toList = state.lists.find((list) => list.id === toListId);

      if (!fromList || !toList) return state;

      const fromCards = [...fromList.cards];
      const [moveCard] = fromCards.splice(fromIndex, 1);

      if (fromListId === toListId) {
        fromCards.splice(toIndex, 0, moveCard);

        return {
          ...state,
          lists: state.lists.map((list) =>
            list.id === fromListId ? { ...list, cards: fromCards } : list,
          ),
        };
      }

      const toCards = [...toList.cards];
      toCards.splice(toIndex, 0, moveCard);

      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id === fromListId) {
            return { ...list, cards: fromCards };
          }
          if (list.id === toListId) {
            return { ...list, cards: toCards };
          }

          return list;
        }),
      };

    // ===Comment===
    case BoardActionType.ADD_COMMENT:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === action.payload.cardId
                    ? {
                        ...card,
                        comments: [
                          ...card.comments,
                          { id: uuid(), text: action.payload.text },
                        ],
                      }
                    : card,
                ),
              }
            : list,
        ),
      };

    default:
      return state;
  }
}
