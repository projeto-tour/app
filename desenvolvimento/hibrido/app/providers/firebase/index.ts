import { AuthMethods, defaultFirebase, FIREBASE_PROVIDERS, firebaseAuthConfig } from 'angularfire2';

export const FIREBASE_APP_PROVIDERS: any[] = [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyA-hJN5T3YfItdL5-vWZEHNhEKU0eQx6Lo',
    authDomain: 'partiu-tourism.firebaseapp.com',
    databaseURL: 'https://partiu-tourism.firebaseio.com',
    storageBucket: 'partiu-tourism.appspot.com',
  }),
  firebaseAuthConfig({
    method: AuthMethods.Popup,
    remember: 'default'
  })
];