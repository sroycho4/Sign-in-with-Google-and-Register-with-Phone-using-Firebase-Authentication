// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCxyifRcx8IAgOUEx162g5WA9XI1286Mq4",
  authDomain: "reactapp-b156b.firebaseapp.com",
  projectId: "reactapp-b156b",
  storageBucket: "reactapp-b156b.appspot.com",
  messagingSenderId: "684206022296",
  appId: "1:684206022296:web:e3d785daf85647e09b7aed"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
