import { AngularFireModule, AuthMethods } from 'angularfire2';

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyA-hJN5T3YfItdL5-vWZEHNhEKU0eQx6Lo',
    authDomain: 'partiu-tourism.firebaseapp.com',
    databaseURL: 'https://partiu-tourism.firebaseio.com',
    storageBucket: 'partiu-tourism.appspot.com',
};

const firebaseAuthConfig = {
    method: AuthMethods.Popup,
    remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
