import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer, productDetailsReducer} from "./reducers/productReducer";

import { profileReducer, useReducer, forgotPasswordReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    user: useReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
    profile : profileReducer,
    forgotPassword: forgotPasswordReducer,
    
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;