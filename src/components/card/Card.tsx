"use client";

import type { Card } from "@/types/board.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";

interface CardProps {
  card: Card;
  listId: string;
}

const Card: FC<CardProps> = ({ card, listId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      data: { type: "card", listId },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="card"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {card.title}
      <div className="comment">Comments ({card.comments.length})</div>
    </div>
  );
};

export default Card;
