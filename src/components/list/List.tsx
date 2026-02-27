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

interface ListProps {
  list: List;
}

const List: FC<ListProps> = ({ list }) => {
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
      <h3>{list.title}</h3>
      <SortableContext
        items={list.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {list.cards.map((card) => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default List;
