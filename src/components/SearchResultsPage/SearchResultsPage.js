import React from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import style from './SearchResultsPage.scss';
import Posting from './Posting';
import auto from './../SearchPage/TempAutoFill';
import { Link } from 'react-router-dom';
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
      ]
    };

    this.toggleEnterClicked = this.toggleEnterClicked.bind(this);
  }

  componentWillMount () {
    // Enter firebase code here
    console.log("in willmount")
    let temparr = new Array();
    var that = this;
    var postref = firebase.database().ref('users');
    postref.once('value',function(snapshot){
      for(var key in snapshot.val()){
        console.log("snapshot key" + key); //prints out each key
        var newpostref = firebase.database().ref('users/' + key);
        var realpostref = firebase.database().ref('users/' + key + '/posts/')
        newpostref.once('value',function(snapshot){
          var numpost = snapshot.val().Posts;
          //console.log(snapshot.val().Email + "has " + numpost + " Posts")
          if(numpost > 0)
          {
            var j = numpost;
            // for(var i = 1; j = numpost, i <= j; ++i)
            // {
            //   var realpostref = firebase.database().ref('users/' + key + '/posts/' + i);
            //   console.log("i is " + i)
            //   realpostref.once('value', function(snapshot){
            //     console.log(snapshot.val().title)
            //     //console.log(snapshot.val().title)
            //     // const postObject = {
            //     //   title: snapshot.val().title,
            //     //   price: snapshot.val().price,
            //     //   hasImg: false,
            //     //   postID: snapshot.val().description
            //     // }
            //     // temparr.push(postObject);
            //     // that.setState({posts: temparr});
            //   });
            //
            // }
            for (var i = 1; j = numpost, i <= j; ++i)
            {
              console.log("Email is : " + snapshot.val().Email + "key is: " + key)
              //var dir = firebase.database().ref('users/' + key + '/posts/' + i);
              var newtemp = realpostref.child(i)
              newtemp.once('value', function(snapshot){
                var _title = snapshot.val().title;
                console.log('title is: ' + _title)
              });

            }
          }
        });
      }
    });
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
