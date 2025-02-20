import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_apikey,
//   authDomain: import.meta.env.VITE_authDomain,
//   projectId:import.meta.env.VITE_projectId,
//   storageBucket: import.meta.env.VITE_storageBucket,
//   messagingSenderId: import.meta.env.VITE_messagingSenderId,
//   appId: import.meta.env.VITE_appId,
//   measurementId: import.meta.env.VITE_measurementId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyC8DLN2-gpavsHsMTDghv1nuUJH0vZStPE",
  authDomain: "task-management-b0fbe.firebaseapp.com",
  projectId: "task-management-b0fbe",
  storageBucket: "task-management-b0fbe.firebasestorage.app",
  messagingSenderId: "323983861062",
  appId: "1:323983861062:web:96a9503eb259d689d1b147",
  measurementId: "G-CEZSRRD7X8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
