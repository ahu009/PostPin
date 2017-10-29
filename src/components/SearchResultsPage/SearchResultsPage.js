import React from 'react';
import style from './SearchResultsPage.scss';
import PostPin_Info from './../../shared/PostPin_Info';

/**
 * UI Component
 * @type {Class}
 */
class SearchResultsPage extends React.Component {
  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    return (
      <div className={style.container}>
      <div className={style.header}>
        <p> There are x results for {PostPin_Info.searchString} </p>
        <hr className={style.line}/>
      </div>
      </div>
    );
  }
}

export default SearchResultsPage;
