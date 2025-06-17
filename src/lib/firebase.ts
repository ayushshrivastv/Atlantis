// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// It's recommended to move this configuration to environment variables for security
const firebaseConfig = {
  apiKey: "AIzaSyCSKggfq-l1JTqQVziccaKRJQA1Z3mik7E",
  authDomain: "atlantis-59b2c.firebaseapp.com",
  projectId: "atlantis-59b2c",
  storageBucket: "atlantis-59b2c.appspot.com",
  messagingSenderId: "485393939490",
  appId: "1:485393939490:web:d3fdde802a6b22dae25e7b",
  measurementId: "G-MZ7MNVREQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if we are in a browser environment before getting analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
