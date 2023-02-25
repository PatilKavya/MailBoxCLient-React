import { createSlice } from "@reduxjs/toolkit";
const initialIdToken = localStorage.getItem('idToken');
const initialEmail = localStorage.getItem('email');
const authInitialState = {
    idToken: initialIdToken,
    email: initialEmail,
    isLogin: !!initialIdToken
}
const AuthSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        login(state, action){
            state.idToken = action.payload.idToken;
            state.email = action.payload.email;
            state.isLogin = action.payload.idToken;
           
        },
        logout(state){
            state.idToken = '';
            state.isLogin = false;
           
        }
    }
});
export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;