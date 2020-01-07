import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCWpgLkSvASEpyIwFhq65wBEFWKCwlmB4w",
    authDomain: "ecommerce-275ce.firebaseapp.com",
    databaseURL: "https://ecommerce-275ce.firebaseio.com",
    projectId: "ecommerce-275ce",
    storageBucket: "ecommerce-275ce.appspot.com",
    messagingSenderId: "439644103500",
    appId: "1:439644103500:web:6237c7f6a746abbd6725e9",
    measurementId: "G-H782QJ7PLX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const  { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;