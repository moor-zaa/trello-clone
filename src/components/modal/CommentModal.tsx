"use client";

import { BoardActionType } from "@/hooks/useBoard/board.actions";
import { useBoard } from "@/hooks/useBoard/useBoard";
import { Card, Comment } from "@/types/board.types";
import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CommentModalProps {
  card: Card;
  listId: string;
  onClose: () => void;
}

const CommentModal: FC<CommentModalProps> = ({ card, listId, onClose }) => {
  const { dispatch } = useBoard();
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleAddComment = () => {
    if (!text.trim()) return;

    dispatch({
      type: BoardActionType.ADD_COMMENT,
      payload: { listId, cardId: card.id, text },
    });

    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="comment-modal-backdrop" onClick={handleBackdropClick}>
      <div className="comment-modal">
        <div className="comment-modal-header">
          <h2 className="comment-modal-title">Comments for "{card.title}"</h2>
          <button
            className="comment-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="comment-modal-body">
          {card.comments.length === 0 ? (
            <p className="comment-empty-state">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="comments-list">
              {card.comments.map((comment: Comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-text">{comment.text}</div>
                </div>
              ))}
            </div>
          )}

          <div className="comment-input-section">
            <textarea
              className="comment-textarea"
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />
            <button
              className="success-button ml-auto"
              onClick={handleAddComment}
              disabled={!text.trim()}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
};

export default CommentModal;
