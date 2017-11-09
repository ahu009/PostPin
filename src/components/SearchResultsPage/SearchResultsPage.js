import React from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import style from './SearchResultsPage.scss';
import Posting from './Posting';
import auto from './../SearchPage/TempAutoFill';
import { Link } from 'react-router-dom';

/**
 * UI Component
 * @type {Class}
 */
class SearchResultsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      enterClicked: false
    };

    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
  }

  toggleEnterClicked () {
    sessionStorage.setItem("userSearch",`'${document.querySelector('input[autocomplete="off"]').value}'`);
    document.getElementById("navigate").click();
  }



  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {
    let category = '';
    if (sessionStorage.getItem("Category") != '') {
      category = `-- Category: ${sessionStorage.getItem("Category")}`;
    }

    let placeHolderText = `Search for Pins in ${sessionStorage.getItem("schoolName")} ${category}`;
    return (
      <div className={style.container}>
      <Link to="/some/where/search">
        <button id="navigate" className={style.navigate}/>
      </Link>
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
         {this.props.userSearch != '' ? (<p> There are x results for {this.props.userSearch} </p>) : null}
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
