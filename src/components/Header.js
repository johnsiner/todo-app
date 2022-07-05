import React, { useContext } from 'react';
import './Header.css';
import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';
import AppContext from '../store/AppContext';

export default function Header() {
   const {
      toggleTheme,
      appState: { theme },
   } = useContext(AppContext);

   return (
      <div className="header">
         <h1>TODO</h1>
         <div>
            <img
               src={theme === 'light' ? moonIcon : sunIcon}
               alt="theme-toggle"
               onClick={() => {
                  toggleTheme();
               }}
            />
         </div>
      </div>
   );
}
