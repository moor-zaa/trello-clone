"use client";

import { BoardActionType } from "@/hooks/useBoard/board.actions";
import { useBoard } from "@/hooks/useBoard/useBoard";
import { useState } from "react";

const AddList = () => {
  const { dispatch } = useBoard();
  const [activeInput, setActiveInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    dispatch({
      type: BoardActionType.ADD_LIST,
      payload: { title },
    });

    setTitle("");
    setActiveInput(false);
  };

  if (activeInput) {
    return (
      <div className="add-container">
        <input
          placeholder="Enter a list title ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="">
          <button onClick={handleAdd}>+ Add list</button>
          <button onClick={() => setActiveInput(false)} className="close-button">X</button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-list_button" onClick={() => setActiveInput(true)}>
      + Add another list
    </div>
  );
};

export default AddList;
