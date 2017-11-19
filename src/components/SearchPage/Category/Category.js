import React from 'react';
import style from './Category.scss';

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
              <p onClick={()=>{
                // sessionStorage.setItem("Category", value);
                // sessionStorage.setItem("userSearch", '');
                let tempTags = (sessionStorage.getItem("userTags") != null && sessionStorage.getItem("userTags") != '')
                                  ? JSON.parse(sessionStorage.getItem("userTags")) : [];
                if (!tempTags.includes(value.replace(/\s/g, '').toLowerCase())) {
                  tempTags.push(value.replace(/\s/g, '').toLowerCase());
                  tempTags = JSON.stringify(tempTags);
                  sessionStorage.setItem("userTags", tempTags);
                }
                this.props.refreshParent();
                console.log(sessionStorage.getItem("userTags"));
              }} className={style.tag} key={value}>{value}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
