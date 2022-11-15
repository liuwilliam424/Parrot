
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

const firebaseConfig = {
apiKey: "AIzaSyBUcuvOpLrA0L0tj1pE82YVwZIeBZcSfDI",
authDomain: "parrot-cac27.firebaseapp.com",
databaseURL: "https://parrot-cac27-default-rtdb.firebaseio.com",
projectId: "parrot-cac27",
storageBucket: "parrot-cac27.appspot.com",
messagingSenderId: "40805265769",
appId: "1:40805265769:web:53eeeede473a2680ce4df8",
measurementId: "G-96J2CZKLYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

