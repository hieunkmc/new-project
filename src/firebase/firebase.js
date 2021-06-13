import firebase from "firebase/app";
import 'firebase/firestore'
import "firebase/storage"
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAjXSEGf3W8xhdv62jCJqFTQubTALJ1QUI",
    authDomain: "imageshop-210507.firebaseapp.com",
    databaseURL: "https://imageshop-210507-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "imageshop-210507",
    storageBucket: "imageshop-210507.appspot.com",
    messagingSenderId: "496581299351",
    appId: "1:496581299351:web:fd0ed823ae7d6f8a44edd2"
};

firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const db = firebase.firestore()
// const auth = firebase.auth()

// export { firebase, storage, db, auth as default };

export { firebase as default };