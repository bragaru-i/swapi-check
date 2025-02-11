# Character Management App

This project is a React-based application for viewing and managing character data, built with TypeScript and MUI. It integrates with the Star Wars API (SWAPI) to fetch character details and allows users to navigate between pages.

## 📌 Features

- Fetch character details from SWAPI
- Display loading and error states
- Update character attributes
- Navigate back to the previous page
- Fully tested with Vitest and React Testing Library

## 🛠️ Tech Stack

- **React** (with Hooks)
- **TypeScript**
- **Vite.js** (for fast builds and development)
- **MUI (Material-UI)** (for UI components)
- **React Router** (for navigation)
- **Vitest** (for testing)
- **React Testing Library** (for component tests)
- **React-Query** (for queries) NOTE: Caching is enabled due to server never change data(it can be removed in `main.tsx` file)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/) (preferred package manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/bragaru-i/faraway.git
   cd yourrepo
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Start the development server:

   ```sh
   pnpm dev
   ```

4. Open your browser and go to:

   ```sh
   http://localhost:5173
   ```

## 🧪 Running Tests

To run the test suite, use:

```sh
pnpm test
```

## 📂 Project Structure

```sh

📦 src
 ┣ 📂 api
 ┃ ┗ 📜 swapi.ts       # API hooks for fetching character data
 ┣ 📂 components
 ┃ ┣ 📜 input-cell.tsx  # Editable input field component
 ┃ ┣ 📜 centered-circular-progress.tsx  # Loader component
 ┣ 📂 pages
 ┃ ┗ 📜 character.page.tsx  # Character detail page
 ┣ 📂 tests
 ┃ ┗ 📜 character.page.test.tsx  # Unit tests for CharacterPage
 ┣ 📜 App.tsx
 ┣ 📜 main.tsx
 ┗ 📜 routes.tsx
```

## 🎯 API Usage

This app fetches character details from the Star Wars API using `useGetCharacterById`:

```ts
const { data, isLoading, isError } = useGetCharacterById(id)
```
