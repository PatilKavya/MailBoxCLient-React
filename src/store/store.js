import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import composeReducer from "./Composer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        compose: composeReducer
    }
})

export default store;