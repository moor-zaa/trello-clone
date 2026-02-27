# 🗂 Trello-like Board App

A modern Kanban-style board application built with **Next.js 14 (App Router)**, **TypeScript**, and a scalable state management architecture using **useReducer + Context API**.

This project demonstrates clean architecture, modular SCSS styling, and production-ready frontend patterns.

---

## 🚀 Features

- ✅ Create / Delete Lists
- ✅ Create / Delete Cards
- ✅ Add Comments to Cards
- ✅ Modal-based Comment UI
- ✅ Global State Management (useReducer)
- ✅ SCSS Modules Architecture
- ✅ Clean Folder Structure
- ✅ Fully Client-Side State (No External State Library)

---

## 🏗 Tech Stack

- **Next.js 14 (App Router)**
- **React 18**
- **TypeScript**
- **SCSS Modules**
- **Context API**
- **useReducer Pattern**

---

## 📂 Project Structure
src/
├── app/
├── components/
│ ├── board/
│ ├── list/
│ ├── card/
│ ├── commentModal/
│ └── ui/
├── hooks/
│ └── useBoard/
│ ├── board.reducer.ts
│ ├── board.actions.ts
│ └── useBoard.ts
├── styles/
│ ├── abstracts/
│ ├── base/
│ ├── utilities/
│ └── main.scss
├── types/
│ └── board.types.ts


---

## 🪄 Example Action

```ts
dispatch({
  type: BoardActionType.ADD_COMMENT,
  payload: { listId, cardId, text },
});

📦 Installation
git clone <repo-url>
cd project-name
npm install
npm run dev

App runs at:

http://localhost:3000
