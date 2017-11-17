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
      enterClicked: false,
      posts: [
      /* post array firebase here maybe */
      {
        title: 'This is a test',
        price: '69',
        hasImg: true,
        postID: '69696969'
      },
      {
        title: 'I love steven',
        price: '420',
        hasImg: true,
        postID: '8===D'
      },
      {
        title: 'I love steven',
        price: '420',
        hasImg: true,
        postID: '8===D'
      },
      {
        title: 'I love steven',
        price: '420',
        hasImg: true,
        postID: '8===D'
      },
      {
        title: 'I love steven',
        price: '420',
        hasImg: true,
        postID: '8===D'
      },
      ]
    };

    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
  }

  onComponentWillMount () {
    // Enter firebase code here
    this.setState();
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
         {this.props.userSearch != '' ? (<p> There are {this.state.posts.length} results for {this.props.userSearch} </p>) : null}
        </div>
        <hr className={style.line}/>


        <div className={style.postingContainer}>
          {this.state.posts.map((value) => {
            return (<ul>
              <Link to="/some/where/search/posting">
                <Posting title={value.title} price={value.price} hasImage={value.hasImg}/>
              </Link>
            </ul>)
          })}
        </div>
      </div>
    );
  }
}

export default SearchResultsPage;
