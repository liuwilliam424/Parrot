//https://firebase.google.com/docs/web/learn-more#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

//Firebase configuration
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
const database = getDatabase();
const analytics = getAnalytics(app);

let example = document.querySelector('#example')
let slow = document.querySelector('#slow')
let repeat = document.querySelector('#repeat')
let comment = document.querySelector('#comment')

example.onclick = () => {
    location.href = "student_session_main.html"
}

slow.onclick = () => {
    location.href = "student_session_main.html"
}

repeat.onclick = () => {
    location.href = "student_session_main.html"
}

comment
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        location.href = "student_session_main.html"
    }
});