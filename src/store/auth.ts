import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

// TODO わからん。
// TODO 一旦 Cookie からの取得に逃げる。

const initialState = {
  session: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      return Object.assign({}, state, { session: action.payload });
    },
  },
});

export default slice.reducer;

export const isAuthSelector = (state: { auth: { session: string } }) =>
  state.auth.session !== null;

export function login(userId: string, password: string) {
  return async function (dispatch: Dispatch) {
    console.log(dispatch);
    const session = await axios.post("http://localhost:8080/sessions");
    dispatch(slice.actions.setSession(session));
  };
}
