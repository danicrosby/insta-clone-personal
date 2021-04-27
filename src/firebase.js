import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBrIcSpQFPjYrgFKvNWf_MmSWtOLEsURkM",
  authDomain: "insta-clone-react-949a9.firebaseapp.com",
  projectId: "insta-clone-react-949a9",
  storageBucket: "insta-clone-react-949a9.appspot.com",
  messagingSenderId: "434942847713",
  appId: "1:434942847713:web:ce4551ccfad5b17d8ba5a0",
  measurementId: "G-Q5Q33EVN7B"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
