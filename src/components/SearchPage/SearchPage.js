import React from 'react';
import style from './SearchPage.scss';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import auto from './TempAutoFill';
import Button from './../Button';
import { Link } from 'react-router-dom';
import school from './../../shared/school';

/**
 * UI Component
 * @type {Class}
 */
class SearchPage extends React.Component {

  /**
   * Render function for UIComponent Component
   * @return {JSX} Component to render
   */
  render () {

    return (
      <div className={style.container}>
        <div className={style.school}> Pins in {school.name} </div>
        <div className={style.text}> Search for Pins </div>
        <div className={style.button}>
          <Link to="/">
            <Button buttonText={'Back'} />
          </Link>
          <div className={style.create}>
            <Button buttonText={'Create Pin'} />
          </div>
        </div>
        <MuiThemeProvider>
          <SearchBar
            dataSource={auto}
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              width: 700,
              position: 'absolute',
              left: '33%'
            }}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SearchPage;
