"use client";

import type { Card } from "@/types/board.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC, useState } from "react";
import EditableText from "../ui/EditableText";
import { BoardActionType } from "@/hooks/useBoard/board.actions";
import { useBoard } from "@/hooks/useBoard/useBoard";
import CommentModal from "../modal/CommentModal";

interface CardProps {
  card: Card;
  listId: string;
}

const Card: FC<CardProps> = ({ card, listId }) => {
  const { dispatch } = useBoard();
  const [open, setOpen] = useState(false);

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
      <EditableText
        value={card.title}
        onChange={(title) =>
          dispatch({
            type: BoardActionType.UPDATE_CARD_TITLE,
            payload: {
              cardId: card.id,
              listId: listId,
              title,
            },
          })
        }
      />

      <button className="comment ml-auto" onClick={() => setOpen(true)}>
        Comments ({card.comments.length})
      </button>
      {open && (
        <CommentModal
          card={card}
          listId={listId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default Card;
