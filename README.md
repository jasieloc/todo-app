# Todo App 📝

A cross-platform todo application built with **Expo** and **Convex** for real-time data synchronization.

## Tech Stack

- **Frontend**: [Expo](https://expo.dev) with [Expo Router](https://docs.expo.dev/router/introduction) (file-based routing)
- **Backend**: [Convex](https://convex.dev) (real-time backend)
- **UI**: React Native with custom theming (light/dark mode)
- **Navigation**: Tab-based navigation with `@react-navigation/bottom-tabs`

## Features

- ✅ Add, edit, and delete todos
- ✅ Toggle todo completion status
- ✅ Real-time sync across devices via Convex
- ✅ Light/Dark mode theme support
- ✅ Persistent theme preference with AsyncStorage

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Convex account](https://convex.dev)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   EXPO_PUBLIC_CONVEX_URL=your_convex_deployment_url
   ```

3. **Start the Convex development server**

   ```bash
   npx convex dev
   ```

4. **Start the Expo app**

   ```bash
   npx expo start
   ```

### Running the App

After starting, you can open the app in:

- [Expo Go](https://expo.dev/go) on your phone
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- Web browser

## Project Structure

```
todo-app/
├── app/                    # App screens (file-based routing)
│   ├── (tabs)/             # Tab navigator screens
│   │   ├── _layout.tsx     # Tab layout configuration
│   │   ├── index.tsx       # Main todos screen
│   │   └── settings.tsx    # Settings screen
│   └── _layout.tsx         # Root layout with providers
├── convex/                 # Convex backend
│   ├── schema.ts           # Database schema
│   └── todos.ts            # Todo mutations & queries
├── hooks/                  # Custom React hooks
│   └── useTheme.tsx        # Theme context & hook
└── assets/                 # Static assets
```

## API Reference

### Queries

| Function   | Description                               |
| ---------- | ----------------------------------------- |
| `getTodos` | Fetch all todos (ordered by newest first) |

### Mutations

| Function         | Arguments                           | Description              |
| ---------------- | ----------------------------------- | ------------------------ |
| `addTodo`        | `{ text: string }`                  | Create a new todo        |
| `toggleTodo`     | `{ id: Id<"todos"> }`               | Toggle completion status |
| `updateTodo`     | `{ id: Id<"todos">, text: string }` | Update todo text         |
| `deleteTodo`     | `{ id: Id<"todos"> }`               | Delete a single todo     |
| `deleteAllTodos` | —                                   | Delete all todos         |

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Convex Documentation](https://docs.convex.dev/)
- [React Native Documentation](https://reactnative.dev/)
