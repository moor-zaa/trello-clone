"use client";
import {
  DndContext,
  DragOverEvent,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useBoard } from "@/hooks/useBoard/useBoard";
import { BoardActionType } from "@/hooks/useBoard/board.actions";
import List from "../list/List";
import EditableText from "../ui/EditableText";
import AddList from "../list/AddList";

const Board = () => {
  const { board, dispatch } = useBoard();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.listId;
    const overContainer = over.data.current?.listId || over.id;

    if (
      active.data.current?.type === "card" &&
      activeContainer !== overContainer
    ) {
      const fromList = board.lists.find((list) => list.id === activeContainer);
      const toList = board.lists.find((list) => list.id === overContainer);

      if (!fromList || !toList) return;

      const fromIndex = fromList.cards.findIndex((c) => c.id === active.id);
      const toIndex =
        over.data.current?.type === "card"
          ? toList.cards.findIndex((card) => card.id === over.id)
          : toList.cards.length;

      dispatch({
        type: BoardActionType.MOVE_CARD,
        payload: {
          fromListId: activeContainer,
          toListId: overContainer,
          fromIndex,
          toIndex,
        },
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === "list" && active.id !== over.id) {
      const fromIndex = board.lists.findIndex((list) => list.id === active.id);
      const toIndex = board.lists.findIndex((list) => list.id === over.id);
      dispatch({
        type: BoardActionType.MOVE_LIST,
        payload: { fromIndex, toIndex },
      });
    }

    if (active.data.current?.type === "card" && active.id !== over.id) {
      const listId = active.data.current.listId;
      const list = board.lists.find((list) => list.id === listId);
      if (!list) return;

      const fromIndex = list.cards.findIndex((card) => card.id === active.id);
      const toIndex = list.cards.findIndex((card) => card.id === over.id);

      dispatch({
        type: BoardActionType.MOVE_CARD,
        payload: { fromListId: listId, toListId: listId, fromIndex, toIndex },
      });
    }
  };

  return (
    <div>
      <h2>
        <EditableText
          value={board.title}
          onChange={(title) =>
            dispatch({
              type: BoardActionType.UPDATE_BOARD_TITLE,
              payload: title,
            })
          }
          className="board-title"
        />
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={board.lists.map((l) => l.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="lists" style={{ display: "flex", gap: "1rem" }}>
            {board.lists.map((list) => (
              <List key={list.id} list={list} />
            ))}
            <AddList />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Board;
