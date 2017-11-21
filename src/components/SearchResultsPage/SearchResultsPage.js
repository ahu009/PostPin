import React from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Button from './../Button';
import style from './SearchResultsPage.scss';
import Posting from './Posting';
import ViewPost from './../ViewPost';
import auto from './../SearchPage/TempAutoFill';
import firebase from './../../firebase.js';


/**
 * UI Component
 * @type {Class}
 */
class SearchResultsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      enterClicked: false,
      posts: []
    };

    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
    this.queryKeyword = this.queryKeyword.bind(this);
    this.queryTags = this.queryTags.bind(this);
    this.queryPriceRange = this.queryPriceRange.bind(this);
    this.querySchool = this.querySchool.bind(this);
  }

  componentWillMount () {
    // Enter firebase code here
    let temparr = new Array();
    var that = this;
    var postref = firebase.database().ref('users');
    postref.once('value',function(snapshot){
      for(var key in snapshot.val()){
        var newpostref = firebase.database().ref('users/' + key);
        var realpostref = firebase.database().ref('users/' + key + '/posts/')
        var newkey = key;
        newpostref.once('value',function(snapshot){
          var postnum = snapshot.val().Posts;
        })
        realpostref.once('value',function(snapshot){
          snapshot.forEach(function(data){ //this function loops through all the posts in fire base
            const posting = {
              title: data.val().title,
              price: data.val().price,
              hasImg: false,
              postID: `${data.val().price}+${data.val().school.replace(/\s/g, '')}+${data.val().tags}+${data.val().description}`,
              tags: data.val().tag,
              school: data.val().school,
              description: data.val().description,
              posterEmail: data.val().posterEmail,
              numPics: data.val().numPics,
              posterID: data.val().posterID,
              postNum: data.val().postNum
            }
            if (that.queryPriceRange(posting) && that.queryKeyword(posting) && that.queryTags(posting) && that.querySchool(posting)) {
              temparr.push(posting);
            }
          })
          that.setState({posts: temparr});
        });
      }
    });
  }

  toggleEnterClicked () {
    sessionStorage.setItem("userSearch", document.querySelector('input[type="text"]').value);
    document.getElementById("navigate").click();
    this.setState({posts: []});
    this.componentWillMount();
  }

  queryKeyword (posting) {
    return posting.title.toLowerCase().includes(sessionStorage.getItem("userSearch").toLowerCase());
  }

  queryTags (posting) {
    if (sessionStorage.getItem("userTags") != null
        && JSON.parse(sessionStorage.getItem("userTags")).length != 0) {
      let searchTags = JSON.parse(sessionStorage.getItem("userTags"));
      let postingTags = posting.tags.replace(/\s/g, '') != '' ? posting.tags.replace(/\s/g, '').toLowerCase().split(",") : [];
      for (let i = 0; i < searchTags.length; i++) {
        if (postingTags.includes(searchTags[i])) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  querySchool (posting) {
    return posting.school === sessionStorage.getItem("schoolName");
  }

  queryPriceRange (posting) {
    if (sessionStorage.getItem("userPrice") != null
        && JSON.parse(sessionStorage.getItem("userPrice")).length != 0
        && sessionStorage.getItem("userPrice") != '["$ - $"]') {
          console.log(sessionStorage.getItem("userPrice"));
      let tempPrice = sessionStorage.getItem("userPrice");
      tempPrice = tempPrice.replace(/["$\s]/gi, '').replace(/[\[\]']+/g, '');
      tempPrice = tempPrice.split("-");
      let higherNum = Math.max(Number(tempPrice[0]), Number(tempPrice[1]));
      let lowerNum = Math.min(Number(tempPrice[0]), Number(tempPrice[1]));
      return (posting.price  <= higherNum && posting.price >= lowerNum) ? true : false
    }
    return true;
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
          onRequestSearch={() => this.toggleEnterClicked()}
          onChange={() => {}}
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
         {this.props.userSearch != null ? (<p> There are {this.state.posts.length} results for {`'${this.props.userSearch}'`} </p>) : null}
        </div>
        <hr className={style.line}/>

        <div className={style.postingContainer}>
          {this.state.posts.map((value) => {
            return (<ul onClick={() => setTimeout(this.props.refresh(this.state.posts))}>
              <Posting title={value.title} price={value.price} hasImage={value.hasImg} id={value.postID} />
            </ul>)
          })}
        </div>
        <div className={style.back}>
          <Link to="/some/where">
            <Button buttonText="Back" />
          </Link>
        </div>
      </div>
    );
  }
}

export default SearchResultsPage;
