import React, { Fragment, useContext } from 'react';
import AppContext from '../store/AppContext';
import Card from './Card';
import './TodoBody.css';
import TodoListItem from './TodoListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilteredTodoListItem from './FilteredTodoListItem';

export default function TodoBody(props) {
   const {
      appState: { todoList, filter },
      clearCompleted,
      reorderTodoList,
      setFilter,
   } = useContext(AppContext);

   const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
   };

   const dragEndHandler = (result) => {
      reorderTodoList(
         reorder(todoList, result.source.index, result.destination.index)
      );
   };

   const completedListItems = todoList
      .filter((item) => item.completed === true)
      .map((todoItem) => (
         <FilteredTodoListItem
            key={todoItem.id}
            task={todoItem.task}
            completed={todoItem.completed}
            id={todoItem.id}
         />
      ));

   const uncompleteListItems = todoList
      .filter((item) => item.completed !== true)
      .map((todoItem) => (
         <FilteredTodoListItem
            key={todoItem.id}
            task={todoItem.task}
            completed={todoItem.completed}
            id={todoItem.id}
         />
      ));

   return (
      <Fragment>
         <Card className="todo-body">
            <DragDropContext onDragEnd={dragEndHandler}>
               <Droppable droppableId="7478">
                  {(provided) => (
                     <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="todo-list"
                     >
                        {filter === 'all' &&
                           todoList.map((todoItem, index) => (
                              <Draggable
                                 draggableId={todoItem.id}
                                 key={todoItem.id}
                                 index={index}
                              >
                                 {(provided) => (
                                    <TodoListItem
                                       provided={provided}
                                       ref={provided.innerRef}
                                       task={todoItem.task}
                                       completed={todoItem.completed}
                                       id={todoItem.id}
                                    />
                                 )}
                              </Draggable>
                           ))}
                        {filter === 'completed' && completedListItems}
                        {filter === 'active' && uncompleteListItems}
                        {provided.placeholder}
                     </ul>
                  )}
               </Droppable>
            </DragDropContext>
            <div className="actions">
               <p className="items-left">{`${uncompleteListItems.length} item${
                  uncompleteListItems.length > 1 ? 's' : ''
               } left`}</p>
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
