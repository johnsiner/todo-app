import { useEffect, useReducer, useState } from 'react';
import AppContext from './AppContext';

// custom hook to get system theme
const useThemeDetector = () => {
   const getCurrentTheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches;
   const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
   const mqListener = (e) => {
      setIsDarkTheme(e.matches);
   };

   useEffect(() => {
      const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
      darkThemeMq.addEventListener('change', mqListener);
      return () => darkThemeMq.removeEventListener('change', mqListener);
   }, []);
   return isDarkTheme;
};

const appReducer = (state, action) => {
   switch (action.type) {
      case 'TOGGLE_THEME':
         const newTheme = state.theme === 'light' ? 'dark' : 'light';
         return { ...state, theme: newTheme };
      case 'ADD_TODO_ITEM':
         const newTodoList = state.todoList.concat(action.payload);
         localStorage.setItem('todoList', JSON.stringify(newTodoList));
         return { ...state, todoList: newTodoList };
      case 'DELETE_TODO_ITEM': {
         const updatedTodoList = state.todoList.filter(
            (todo) => todo.id !== action.id
         );
         localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
         return { ...state, todoList: updatedTodoList };
      }
      case 'TODO_COMPLETED': {
         const completedItemIndex = state.todoList.findIndex(
            (todo) => todo.id === action.id
         );
         const completedItem = state.todoList[completedItemIndex];
         const updatedItem = { ...completedItem, completed: true };
         const updatedTodoList = [...state.todoList];
         updatedTodoList[completedItemIndex] = updatedItem;
         localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
         return { ...state, todoList: updatedTodoList };
      }
      case 'CLEAR_COMPLETED': {
         const updatedTodoList = state.todoList.filter(
            (todo) => todo.completed !== true
         );
         localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
         return { ...state, todoList: updatedTodoList };
      }
      default:
         return state;
   }
};

const AppContextProvider = (props) => {
   const defaultAppState = {
      theme: useThemeDetector() ? 'dark' : 'light',
      todoList: localStorage.getItem('todoList')
         ? JSON.parse(localStorage.getItem('todoList'))
         : [],
   };
   const [appState, dispatchAction] = useReducer(appReducer, defaultAppState);

   const toggleTheme = () => {
      dispatchAction({ type: 'TOGGLE_THEME' });
   };

   const addTodoItem = (todo) => {
      dispatchAction({
         type: 'ADD_TODO_ITEM',
         payload: { task: todo, id: Date.now(), completed: false },
      });
   };

   const deleteTodoItem = (id) => {
      dispatchAction({ type: 'DELETE_TODO_ITEM', id: id });
   };

   const todoCompleted = (id) => {
      dispatchAction({ type: 'TODO_COMPLETED', id: id });
   };

   const clearCompleted = () => {
      dispatchAction({ type: 'CLEAR_COMPLETED' });
   };

   const appContext = {
      appState,
      toggleTheme,
      addTodoItem,
      deleteTodoItem,
      todoCompleted,
      clearCompleted,
   };

   return (
      <AppContext.Provider value={appContext}>
         {props.children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
