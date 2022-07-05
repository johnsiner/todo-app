import React, { useContext, useState } from 'react';
import AppContext from '../store/AppContext';
import Card from './Card';
import './Input.css';

export default function Input() {
   const { addTodoItem } = useContext(AppContext);
   const [todoInput, setTodoInput] = useState('');

   const formSubmitHandler = (e) => {
      e.preventDefault();
      addTodoItem(todoInput);
      setTodoInput('');
   };

   return (
      <Card>
         <form className="todo-form" onSubmit={formSubmitHandler}>
            <div></div>
            <input
               placeholder="Create a new todo..."
               onChange={(e) => setTodoInput(e.target.value)}
               value={todoInput}
               required
            ></input>
         </form>
      </Card>
   );
}
