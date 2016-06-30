import { AuthMethods, defaultFirebase, FIREBASE_PROVIDERS, firebaseAuthConfig } from 'angularfire2';

export const FIREBASE_APP_PROVIDERS: any[] = [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyDy8QsFRHL5h5eerK1edktClERH5NemUP8",
    authDomain: "turismo-995.firebaseapp.com",
    databaseURL: "https://turismo-995.firebaseio.com",
    storageBucket: "turismo-995.appspot.com",
  }),
  firebaseAuthConfig({
    method: AuthMethods.Popup,
    remember: 'default'
  })
];