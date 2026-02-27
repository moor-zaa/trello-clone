"use client";

import { BoardActionType } from "@/hooks/useBoard/board.actions";
import { useBoard } from "@/hooks/useBoard/useBoard";
import { FC, useState } from "react";

interface AddCardProps {
  listId: string;
}

const AddCard: FC<AddCardProps> = ({ listId }) => {
  const { dispatch } = useBoard();
  const [activeInput, setActiveInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch({
      type: BoardActionType.ADD_CARD,
      payload: {
        title,
        listId,
      },
    });

    setTitle("");
    setActiveInput(false);
  };

  if (activeInput) {
    return (
      <div className="">
        <input
          placeholder="Enter a Card title ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="">
          <button className="success-button" onClick={handleAdd}>
            + Add card
          </button>
          <button
            onClick={() => setActiveInput(false)}
            className="close-button"
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-card_button" onClick={() => setActiveInput(true)}>
      + Add another card
    </div>
  );
};

export default AddCard;
