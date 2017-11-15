import React from 'react';
import style from './Category.scss';
import { Link } from 'react-router-dom';

/**
 * Category
 * @type {Class}
 */
class Category extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
      <div className={style.header}> {this.props.name} </div>
        <div className={style.content}>
          {this.props.name === "Account Information"
          ? (<div><div className={style.text}>
              <p className={style.headers}> Email: </p>
              <p> {this.props.info.email} </p>
            </div>
            <div className={style.text}>
              <p className={style.headers}> Phone Number: </p>
              <p>{this.props.info.phone}</p>
            </div>
            <div className={style.text}>
              <p className={style.headers}> Password: </p>
              <p>{this.props.info.password}</p>
            </div></div>) : (<div> {this.props.info} </div>)}
        </div>
      </div>
    );
  }
}

export default Category;
