
//https://firebase.google.com/docs/web/learn-more#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, child, push, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { Timestamp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

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

let session_id = localStorage.getItem("SessionID")
let UID = localStorage.getItem("UID")
let understanding_button = document.querySelector("#understanding_button")
let okay_button = document.querySelector("#okay_button")
let confused_button = document.querySelector("#confused_button")
let should_be_here = true


function submit_response(uid, rating) {
  console.log("response submitting")
  // A post entry.

  const list_ref = ref(database, '/Sessions/' + session_id + '/responses')
  const new_post_ref = push(list_ref)

  const session_entry = {
    UID: uid,
    rating: rating,
    time: Timestamp.now(),
  };

  set(new_post_ref, session_entry)
}

understanding_button.onclick = () => {
  submit_response(UID, 3)
}

okay_button.onclick = () => {
  submit_response(UID, 2)
}

confused_button.onclick = () => {
  submit_response(UID, 1)
  should_be_here = false
  location.href = "../html/student_confused.html"
}

if (localStorage.getItem("First_time") == "True") {
  localStorage.setItem("First_time", "False")
  submit_response(UID, 3)
}

function bad_boy(uid) {
  push(ref(database, '/Sessions/' + session_id + '/naughty_boys'), {
    user_id: uid,
    badness: "bad"
  });
}

function good_boy(uid) {
  push(ref(database, '/Sessions/' + session_id + '/naughty_boys'), {
    user_id: uid,
    badness: "good"
  });
}

document.addEventListener("visibilitychange", () => {
  let on_tab = document.visibilityState;
  console.log(on_tab);
  if (should_be_here) {
    if (on_tab == "hidden") {
      bad_boy(UID)
    }
    if (on_tab == "visible") {
      good_boy(UID)
    }
  }
})

// window.onresize = (event) => {
//   console.log(window.innerHeight)
//   console.log(window.innerWidth)

//   if (window.innerHeight != localStorage.getItem("Window_height")) {
//     bad_boy(UID)
//   }
//   if (window.innerWidth != localStorage.getItem("Window_width")) {
//     bad_boy(UID)
//   }
//   if (window.innerHeight == localStorage.getItem("Window_height") && window.innerWidth == localStorage.getItem("Window_width")) {
//     good_boy(UID)
//   }
// }
