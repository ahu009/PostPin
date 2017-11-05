import React from 'react';
import style from './SearchResultsPage.scss';
import Posting from './Posting';

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
          <p> There are x results for {sessionStorage.getItem("userSearch")} </p>
        </div>
        <hr className={style.line}/>
        <div className={style.postingContainer}>
          <ul> <Posting title="Shit for sell" price="69420" hasImage={false}/> </ul>
        </div>
      </div>
    );
  }
}

export default SearchResultsPage;
