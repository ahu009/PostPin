import React from 'react';
import style from './Posting.scss';

/**
 * UI Component
 * @type {Class}
 */
class Posting extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    let hasImageText = this.props.hasImage ? "w/ img" : "no img";
    return (
      <div className={style.container}>
        <p className={style.text}> {this.props.title} -- {this.props.price} [{hasImageText}] </p>
      </div>
    );
  }
}

export default Posting;
