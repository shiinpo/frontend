/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from 'redux-thunk';
// Import reducers and state type
import {
    categoryReducer,
    ICategoryState,
} from '../reducers/categoryReducer';

// Create an interface for the application state
export interface IAppState {
    categoryState: ICategoryState;
}

// Create variable to hold api url for request
const apiURL:string = process.env.REACT_APP_API_URL || "";
export { apiURL };

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
    categoryState: categoryReducer,
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
    const store = createStore(
        rootReducer, 
        undefined,
        composeWithDevTools(
            applyMiddleware(
                thunk
            ),
        )
    );
    return store;
};
