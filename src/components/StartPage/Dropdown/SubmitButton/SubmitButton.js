import React from 'react';
import style from './SubmitButton.scss';

/**
 * UI Component
 * @type {Class}
 */
class SubmitButton extends React.Component {
  /**
  * Constructor for UI Component
  * @param  {Object} props  Props passed to this class
  * @return {void}
  */
 constructor (props) {
   super(props);
   this.state = { clicked: true };
   this.toggle = this.toggle.bind(this);
 }

 /**
  * Toggle
  * @return {void}
  */
 toggle () {
   this.setState({clicked: !this.state.clicked});
 }

 /**
  * Render function for UIComponent Component
  * @return {JSX} Component to render
  */
 render () {
   const clicked = this.state.clicked;

   return (
     <div>
       {
         this.props.shouldHide
         ?
         null
       :
         <div className={style.container} onClick={this.toggle}>
          <p className={style.text}>
             Submit
          </p>
         </div>
       }
     </div>
   );
 }
}

export default SubmitButton;
