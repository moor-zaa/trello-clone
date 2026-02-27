"use client";

import styles from "./page.module.css";
import { useBoard } from "@/hooks/useBoard";
import { Card, List } from "@/types/board.types";

export default function Home() {
  const { board } = useBoard();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{board.title}</h1>

        <div>
          {board.lists.map((list: List) => (
            <div key={list.id}>
              <h3>{list.title}</h3>
              {list.cards.map((card: Card) => (
                <div key={card.id}>{card.title}</div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
