import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCGBKy6h_4pbwHiF89BuowZN-WpL28Vbcs",
    authDomain: "whatsapp-86903.firebaseapp.com",
    projectId: "whatsapp-86903",
    storageBucket: "whatsapp-86903.appspot.com",
    messagingSenderId: "734459271687",
    appId: "1:734459271687:web:ebe8aaff43872d1919a8a2"
};


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};