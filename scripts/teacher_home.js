import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

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

function writeUserData(UID, name, role) {
    console.log("writing user data")
    const db = getDatabase();
    set(ref(db, 'Users/' + UID), {
      name: name,
      role: role,
    });
  }

writeUserData(localStorage.getItem("UID"), localStorage.getItem("Name"), localStorage.getItem("Role"))

let session_code = Math.floor(Math.random()*10000000)
localStorage.setItem("SessionID", session_code)

let code_display = document.querySelector('#session_code')
code_display.innerHTML = "Your code is " + session_code

let start_button = document.querySelector("#start_session")
start_button.onclick = () => {location.href = "../html/teacher_session_main.html"}