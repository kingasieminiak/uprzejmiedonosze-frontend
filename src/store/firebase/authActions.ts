import { Dispatch } from "redux";
import { StoreExtraArgs } from "..";
import { GoogleAuthProvider } from "firebase/auth";
import { USER_ACTIONS } from "../user/actionTypes";

export function signInUser() {
  return (dispatch: Dispatch, _: any, { getFirebase }: StoreExtraArgs) => {
    const firebase = getFirebase();
    const authProvider = new GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(authProvider)
      .catch((error: Error) => console.error("signInWithPopup", error));
  };
}

export function signOutUser() {
  return (dispatch: Dispatch, _: any, { getFirebase }: StoreExtraArgs) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
    dispatch({ type: USER_ACTIONS.logout })
  };
}
