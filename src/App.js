import { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Input from './components/Input';
import TodoBody from './components/TodoBody';
import AppContext from './store/AppContext';

function App() {
   const appCtx = useContext(AppContext);

   return (
      <div className="app" id={appCtx.appState.theme}>
         <div className="bg-image"></div>
         <div className="container">
            <Header />
            <Input />
            <TodoBody />
         </div>
      </div>
   );
}

export default App;
