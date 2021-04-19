import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzRpQDtN-U7kPn3VkJyiHvRPhwtCcD7lY",
  authDomain: "jenny-4debf.firebaseapp.com",
  projectId: "jenny-4debf",
  storageBucket: "jenny-4debf.appspot.com",
  messagingSenderId: "642848998153",
  appId: "1:642848998153:web:e7dfedcb40918ddb5449d8",
  measurementId: "G-HPP4SMVH1B",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };
export default firebaseApp;
