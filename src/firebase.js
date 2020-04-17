import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyArrarpH2aZBieSiTseuLWxdY1r3hvPH5U",
    authDomain: "fir-react-redux-graphql.firebaseapp.com",
    databaseURL: "https://fir-react-redux-graphql.firebaseio.com",
    projectId: "fir-react-redux-graphql",
    storageBucket: "fir-react-redux-graphql.appspot.com",
    messagingSenderId: "1028182952613",
    appId: "1:1028182952613:web:35d91324d67c8c76145b4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function getFavs(uid) {
    return db.doc(uid).get()
        .then(snap => {
            return snap.data().array
        })
}

let db = firebase.firestore().collection('favs');

export function updateDB(array, uid) {
    return db.doc(uid).set({ array });
}

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
}

export function singOutGoogle() {
    firebase.auth().signOut();
}