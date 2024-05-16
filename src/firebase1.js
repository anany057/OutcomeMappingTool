import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
        apiKey: "AIzaSyAljjoeSjwbxdzFrqLT0XpQydDD3jf0Rj4",
        authDomain: "teacher-sfeedbackform.firebaseapp.com",
        databaseURL: "https://teacher-sfeedbackform-default-rtdb.firebaseio.com",
        projectId: "teacher-sfeedbackform",
        storageBucket: "teacher-sfeedbackform.appspot.com",
        messagingSenderId: "658419351936",
        appId: "1:658419351936:web:a34c7df677e976e61c0165",
        measurementId: "G-7W5FY45NCE"
      };

      //initialize your app
      firebase.initializeApp(firebaseConfig);


      //reference your database

//       firebase.initializeApp(firebaseConfig);

      // Reference your Firestore database if you're using it
      const db = firebase.firestore();
      
      export { db };