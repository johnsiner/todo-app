import React, { Fragment, useContext, useState } from 'react';
import AppContext from '../store/AppContext';
import Card from './Card';
import './TodoBody.css';
import TodoListItem from './TodoListItem';

export default function TodoBody() {
   const {
      appState: { todoList },
      clearCompleted,
   } = useContext(AppContext);

   const [filter, setFilter] = useState('all');

   const completedListItems = todoList
      .filter((item) => item.completed === true)
      .map((todoItem) => (
         <TodoListItem
            key={todoItem.id}
            task={todoItem.task}
            completed={todoItem.completed}
            id={todoItem.id}
         />
      ));

   const uncompleteListItems = todoList
      .filter((item) => item.completed !== true)
      .map((todoItem) => (
         <TodoListItem
            key={todoItem.id}
            task={todoItem.task}
            completed={todoItem.completed}
            id={todoItem.id}
         />
      ));

   return (
      <Fragment>
         <Card className="todo-body">
            <ul className="todo-list">
               {(filter === 'all' || filter === 'completed') &&
                  completedListItems}
               {(filter === 'all' || filter === 'active') &&
                  uncompleteListItems}
            </ul>
            <div className="actions">
               <p className="items-left">{`${uncompleteListItems.length} items left`}</p>
               <div className="filter">
                  <p
                     onClick={() => setFilter('all')}
                     className={filter === 'all' ? 'selected-filter' : ''}
                  >
                     All
                  </p>
                  <p
                     onClick={() => setFilter('active')}
                     className={filter === 'active' ? 'selected-filter' : ''}
                  >
                     Active
                  </p>
                  <p
                     onClick={() => setFilter('completed')}
                     className={filter === 'completed' ? 'selected-filter' : ''}
                  >
                     completed
                  </p>
               </div>
               <p
                  className="clear-completed"
                  onClick={() => {
                     clearCompleted();
                  }}
               >
                  Clear completed
               </p>
            </div>
         </Card>
         <Card className="filter mobile actions">
            <p
               onClick={() => setFilter('all')}
               className={filter === 'all' ? 'selected-filter' : ''}
            >
               All
            </p>
            <p
               onClick={() => setFilter('active')}
               className={filter === 'active' ? 'selected-filter' : ''}
            >
               Active
            </p>
            <p
               onClick={() => setFilter('completed')}
               className={filter === 'completed' ? 'selected-filter' : ''}
            >
               completed
            </p>
         </Card>
      </Fragment>
   );
}
