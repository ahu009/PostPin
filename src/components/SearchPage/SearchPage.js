import React from 'react';
import style from './SearchPage.scss';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import auto from './TempAutoFill';

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
        <div className={style.text}> Search for an Item </div>
        <MuiThemeProvider>
          <SearchBar
            dataSource={auto}
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              width: 700,
              top: '37%',
              left: '33%',
              position: 'absolute'
            }}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SearchPage;
