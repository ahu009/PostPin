import React from 'react';
import style from './SmallButton.scss';

/**
 * UI Component
 * @type {Class}
 */
class SmallButton extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container} onClick={this.toggle}>
        <p className={style.text}>
          {this.props.buttonText}
        </p>
      </div>
    );
  }
}

export default SmallButton;
