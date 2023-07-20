import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

const firebaseConfig = {
  apiKey: "AIzaSyBbe6Y-ABAKMLfedFsldPh4bK-380Fscns",
  authDomain: "coffeeshop-imagestore.firebaseapp.com",
  projectId: "coffeeshop-imagestore",
  storageBucket: "coffeeshop-imagestore.appspot.com",
  messagingSenderId: "608331963965",
  appId: "1:608331963965:web:90f3e576bb881c385f5454",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


