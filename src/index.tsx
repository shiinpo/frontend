
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* Make the store available to all container 
components in the application without passing it explicitly */
import { Provider } from 'react-redux';

// Store type from Redux
import { Store } from 'redux';

import { withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

// Import the store function and state
import configureStore, { IAppState, history } from './store/Store';
import { getAllCategories } from './actions/categoryActions';

import './index.css';
import App from './components/App';

interface IProps {
    store: Store<IAppState>;
}

const AppWithRouter = withRouter((props) => <App {...props} />);

/* 
Create a root component that receives the store via props
and wraps the App component with Provider, giving props to containers
*/
const Root: React.SFC<IProps> = props => {
    return (
      <Provider store={props.store}>
        <ConnectedRouter history={history}>
          <AppWithRouter />
        </ConnectedRouter>
      </Provider>
    );
};

// Generate the store
const store = configureStore();
store.dispatch(getAllCategories());

// Render the App
ReactDOM.render(<Root store={store} />, document.getElementById(
    'root'
) as HTMLElement);
