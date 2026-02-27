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

```

├───app
│       favicon.ico
│       globals.css
│       layout.tsx
│       page.tsx
│       
├───components
│   ├───board
│   │       Board.tsx
│   │
│   ├───card
│   │       AddCard.tsx
│   │       Card.tsx
│   │
│   ├───list
│   │       AddList.tsx
│   │       List.tsx
│   │
│   ├───modal
│   │       CommentModal.tsx
│   │
│   └───ui
│           EditableText.tsx
│
├───context
│       BoardContext.tsx
│
├───hooks
│   │   useLocalStorage.ts
│   │
│   └───useBoard
│           board.actions.ts
│           board.reducer.ts
│           board.types.ts
│           useBoard.ts
│
├───services
│       board.service.ts
│
├───styles
│   │   main.scss
│   │
│   ├───abstracts
│   │       _mixins.scss
│   │       _variables.scss
│   │
│   ├───base
│   │       _forms.scss
│   │
│   ├───components
│   │       _board.scss
│   │       _card.scss
│   │       _comment.scss
│   │       _list.scss
│   │       _modal.scss
│   │
│   └───utilities
│           _helpers.scss
│
├───types
│       board.types.ts
│
└───utils

```

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
