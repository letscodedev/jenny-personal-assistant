import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDOKEUkkFn3J1VST674lkUHdz8Jd_0bRMo",
    authDomain: "car-renting-71651.firebaseapp.com",
    projectId: "car-renting-71651",
    storageBucket: "car-renting-71651.appspot.com",
    messagingSenderId: "802899557219",
    appId: "1:802899557219:web:bbb92fd7e19480a15d7156"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;