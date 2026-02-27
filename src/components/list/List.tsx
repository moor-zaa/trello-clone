"use client";

import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "../card/Card";
import type { List } from "@/types/board.types";
import { FC, useState, useRef, useEffect } from "react";
import { useBoard } from "@/hooks/useBoard/useBoard";
import EditableText from "../ui/EditableText";
import { BoardActionType } from "@/hooks/useBoard/board.actions";
import AddCard from "../card/AddCard";

interface ListProps {
  list: List;
}

const List: FC<ListProps> = ({ list }) => {
  const { dispatch } = useBoard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.id,
      data: { type: "list" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        buttonRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleDeleteList = () => {
    // Add your delete list logic here
    dispatch({
      type: BoardActionType.DELETE_LIST,
      payload: { listId: list.id },
    });
    setIsModalOpen(false);
  };

  const handleDeleteAllCards = () => {
    dispatch({
      type: BoardActionType.DELETE_ALL_CARDS,
      payload: { listId: list.id },
    });
    setIsModalOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list"
    >
      <h3 className="flex-between">
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
        <div className="close-button" style={{ position: "relative" }}>
          <span
            ref={buttonRef}
            className="material-symbols-rounded"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(!isModalOpen);
            }}
            style={{ cursor: "pointer" }}
          >
            more_horiz
          </span>

          {isModalOpen && (
            <div
              ref={modalRef}
              className="list-actions-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <span className="modal-title">List Actions</span>
                <span
                  className="material-symbols-rounded close-icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  close
                </span>
              </div>
              <div className="modal-divider"></div>
              <button className="modal-action" onClick={handleDeleteList}>
                Delete List
              </button>
              <button className="modal-action" onClick={handleDeleteAllCards}>
                Delete All Cards
              </button>
            </div>
          )}
        </div>
      </h3>
      <SortableContext
        items={list.cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        {list.cards.map((card) => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </SortableContext>
      <AddCard listId={list.id} />
    </div>
  );
};

export default List;