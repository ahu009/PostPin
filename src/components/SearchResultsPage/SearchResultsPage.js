import React from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import style from './SearchResultsPage.scss';
import Posting from './Posting';
import auto from './../SearchPage/TempAutoFill';

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
    let category = '';
    if (sessionStorage.getItem("Category") != '') {
      category = `Category: ${sessionStorage.getItem("Category")}`;
    }

    let placeHolderText = `Search for Pins in ${sessionStorage.getItem("schoolName")} -- ${category}`;
    return (
      <div className={style.container}>
      <MuiThemeProvider>
        <SearchBar
          dataSource={auto}
          onChange={() => console.log('onChange')}
          onRequestSearch={() => this.toggleEnterClicked()}
          placeholder={placeHolderText}
          style={{
            width: '55%',
            position: 'absolute',
            left: '23%',
            top: '3%'
          }}
        />
      </MuiThemeProvider>
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
