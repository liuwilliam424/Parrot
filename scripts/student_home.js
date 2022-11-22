import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let session_code_box = document.querySelector('#code_enter')
let session_button = document.querySelector('#code_button')

function writeUserData(UID, name, role) {
    const db = getDatabase();
    set(ref(db, 'Users/' + UID), {
      name: name,
      role : role
    });
  }


session_button.onclick = () => {
    writeUserData("wabbafet/john/tree/tree", "name", "imageUrl")
    console.log("Function ran without joe?")
    // console.log(session_code_box.value)
    // localStorage.setItem("SessionID", session_code_box)
    // location.href = "./student_session_main.html"
}



console.log("Printing")
console.log(localStorage.getItem("UID"));
console.log(localStorage.getItem("Name"));
console.log(localStorage.getItem("Role"));
