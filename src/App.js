import { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Input from './components/Input';
import TodoBody from './components/TodoBody';
import AppContext from './store/AppContext';

function App() {
   const {
      appState: { theme, filter },
   } = useContext(AppContext);

   return (
      <div className="app" id={theme}>
         <div className="bg-image"></div>
         <div className="container">
            <Header />
            <Input />
            <TodoBody />
            {filter === 'all' && (
               <p className="footer-text">Drag and drop to reorder list</p>
            )}
         </div>
      </div>
   );
}

export default App;
