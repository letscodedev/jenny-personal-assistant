import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCzRpQDtN-U7kPn3VkJyiHvRPhwtCcD7lY",
	authDomain: "jenny-4debf.firebaseapp.com",
	projectId: "jenny-4debf",
	storageBucket: "jenny-4debf.appspot.com",
	messagingSenderId: "642848998153",
	appId: "1:642848998153:web:21f7025888cd1ac65449d8",
	measurementId: "G-VW0TNY39V6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
