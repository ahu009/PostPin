import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

render(<AppContainer><App/></AppContainer>, document.querySelector('#app'));

if (module && module.hot) {
  module.hot.accept('./', () => {
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector('#app')
    );
  });
}
