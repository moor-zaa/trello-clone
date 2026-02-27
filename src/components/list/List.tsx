"use client";

import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "../card/Card";
import type { List } from "@/types/board.types";
import { FC } from "react";
import { useBoard } from "@/hooks/useBoard/useBoard";
import EditableText from "../ui/EditableText";
import { BoardActionType } from "@/hooks/useBoard/board.actions";

interface ListProps {
  list: List;
}

const List: FC<ListProps> = ({ list }) => {
  const { dispatch } = useBoard();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.id,
      data: { type: "list" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list"
    >
      <h3>
        <EditableText
          value={list.title}
          onChange={(title) =>
            dispatch({
              type: BoardActionType.UPDATE_LIST_TITLE,
              payload: {
                listId: list.id,
                title: title,
              },
            })
          }
          className="list-header"
        />
      </h3>
      <SortableContext
        items={list.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {list.cards.map((card) => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </SortableContext>
      <button>+ Add another card</button>
    </div>
  );
};

export default List;
