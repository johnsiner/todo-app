import React, { useContext } from 'react';
import './TodoListItem.css';
import checkIcon from '../images/icon-check.svg';
import crossIcon from '../images/icon-cross.svg';
import AppContext from '../store/AppContext';

const TodoListItem = React.forwardRef((props, ref) => {
   const { task, completed, id, provided } = props;
   const { todoCompleted, deleteTodoItem } = useContext(AppContext);

   return (
      <li
         ref={ref}
         {...provided.draggableProps}
         {...provided.dragHandleProps}
         className="list-item"
      >
         <div
            className={`checkbox ${completed ? 'completed' : ''}`}
            onClick={() => todoCompleted(id)}
         >
            <img src={checkIcon} alt="check" className="check-icon" />
         </div>
         <p className={`${completed ? 'completed' : ''}`}>{task}</p>
         <div className="cross-icon">
            <img
               src={crossIcon}
               alt="delete"
               onClick={() => deleteTodoItem(id)}
            />
         </div>
      </li>
   );
});

export default TodoListItem;
