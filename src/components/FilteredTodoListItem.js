import React, { useContext } from 'react';
import './TodoListItem.css';
import checkIcon from '../images/icon-check.svg';
import crossIcon from '../images/icon-cross.svg';
import AppContext from '../store/AppContext';

export default function FilteredTodoListItem(props) {
   const { task, completed, id } = props;
   const { todoCompleted, deleteTodoItem } = useContext(AppContext);
   return (
      <li className="list-item">
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
}
