import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import localForage from 'localforage';
import errorMiddleware from './errorMiddleware';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['auth', 'messaging'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(errorMiddleware, thunk, promise)),
);

const persistor = persistStore(store);

export {persistor, store};
