// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//

const firebaseConfig = {
  apiKey: "AIzaSyB2xydXWwngzabn7boTeVM4WElLgomemzY",
  authDomain: "ccs-store-633ff.firebaseapp.com",
  projectId: "ccs-store-633ff",
  storageBucket: "ccs-store-633ff.appspot.com",
  messagingSenderId: "386933472211",
  appId: "1:386933472211:web:1578358f863d97e95c4d26",
  measurementId: "G-DYGTRVSZC3",
};

//
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
