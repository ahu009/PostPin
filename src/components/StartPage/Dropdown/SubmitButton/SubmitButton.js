import React from 'react';
import style from './SubmitButton.scss';
import { Link } from 'react-router-dom';


/**
 * UI Component
 * @type {Class}
 */
class SubmitButton extends React.Component {
 /**
  * Render function for UIComponent Component
  * @return {JSX} Component to render
  */
 render () {
   return (
     <div>
       {
         this.props.shouldHide
         ?
         null
       :
       <div>
        <Link to="/some/where">
         <div className={style.container} onClick={this.toggle}>
            <p className={style.text}> Submit </p>
         </div>
         </Link>
       </div>

       }
     </div>
   );
 }
}

export default SubmitButton;
