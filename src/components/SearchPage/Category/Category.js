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
        <div className={style.tags}>
          {this.props.tags.map((value) => (
            <Link to="/some/where/search">
              <p onClick={()=>sessionStorage.setItem("Category", value)} className={style.tag} key={value}>{value}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
