import React from 'react';
import style from './Posting.scss';
import { Link } from 'react-router-dom';

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
    return (
      <div className={style.container}>
        <Link to={`/some/where/${this.props.id}`}>
          <p className={style.text}> {this.props.title} -- {`$${this.props.price}`} </p>
        </Link>
      </div>
    );
  }
}

export default Posting;
