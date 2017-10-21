import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import routes from './routes';

render(<AppContainer><App/></AppContainer>, document.querySelector('#app'));

if (module && module.hot) {
  module.hot.accept('./', () => {
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      <Router routes={routes} history={history} />,
      document.querySelector('#app')
    );
  });
}
