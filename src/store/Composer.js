import { createSlice } from "@reduxjs/toolkit";

const initialComposeState = {
    composeMail: '',
    fetch: {}
}

const ComposeSlice = createSlice({
    name: 'compose',
    initialState: initialComposeState,
    reducers: {
        composeMail(state, action){
            state.composeMail = action.payload.userMail
        },
        fetchMail(state, action){
            state.fetch = action.payload
        },
        ReadMail(state, action){
            console.log(action.payload);
            console.log(state.fetch);
            
            state.fetch[action.payload].read = true;
           
        },
        sentMail(state, action){
            state.fetch = action.payload
        }
    }
});

export const composeActions = ComposeSlice.actions;
export default ComposeSlice.reducer;