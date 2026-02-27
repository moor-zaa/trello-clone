"use client";

import dynamic from "next/dynamic";

const Board = dynamic(() => import("../components/board/Board"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <main>
        <Board />
      </main>
    </div>
  );
}
