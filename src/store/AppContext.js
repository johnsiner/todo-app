import { createContext } from 'react';

const AppContext = createContext({
   appState: {},
   toggleTheme: () => {},
   addTodoItem: () => {},
   deleteTodoItem: () => {},
   todoCompleted: () => {},
   clearCompleted: () => {},
});

export default AppContext;
