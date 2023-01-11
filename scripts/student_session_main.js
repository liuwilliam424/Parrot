
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

//Initialize HTML elements as variables
let session_id = localStorage.getItem("SessionID")
let UID = localStorage.getItem("UID")
let understanding_button = document.querySelector("#understanding_button")
let okay_button = document.querySelector("#okay_button")
let confused_button = document.querySelector("#confused_button")
let should_be_here = true

//response submitting helper function
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

//when understanding button is clicked send data and change button colors to set button
understanding_button.onclick = () => {
  understanding_button.style.backgroundColor = 'rgb(28, 73, 28)';
  understanding_button.style.border="solid 2px"

  okay_button.style.backgroundColor = 'rgb(233, 126, 5)';
  okay_button.style.border = "none";

  confused_button.style.backgroundColor = 'rgb(190, 50, 50)';
  confused_button.style.border = "none";

  submit_response(UID, 3);
}

//when okay button is clicked send data and change button colors to set relevant button
okay_button.onclick = () => {
  okay_button.style.backgroundColor = 'rgb(195, 107, 6)';
  okay_button.style.border="solid 2px";


  understanding_button.style.backgroundColor = 'rgb(50, 190, 50)';
  understanding_button.style.border = "none";

  confused_button.style.backgroundColor = 'rgb(190, 50, 50)'
  confused_button.style.border = "none";

  submit_response(UID, 2)
}

//when confused button is clicked send data and change button colors to set relevant button
confused_button.onclick = () => {
  submit_response(UID, 1)
  should_be_here = false
  location.href = "../html/student_confused.html"
}

//if the user is on the page for the first time, the confused button gets reset and all buttons are changed to default
if (localStorage.getItem("First_time") == "True") {
  localStorage.setItem("First_time", "False")
  confused_button.style.backgroundColor = 'rgb(190, 50, 50)';
  confused_button.style.border = 'none'

  submit_response(UID, 3)
}

//helper function to push data that user is off tab
function bad_boy(uid) {
  push(ref(database, '/Sessions/' + session_id + '/naughty_boys'), {
    user_id: uid,
    badness: "bad"
  });
}

//helper function to push data that user is back on tab
function good_boy(uid) {
  push(ref(database, '/Sessions/' + session_id + '/naughty_boys'), {
    user_id: uid,
    badness: "good"
  });
}

//listener that detects changes in user's tab visibility status
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

//reset data for buttons back to understanding
function reset() {
  submit_response(UID, 3);
  console.log("reset")
}

//helper function to enable endless ansynchronous callbacks every 3 minutes
const intervalID = setInterval(myCallback, 180000);
function myCallback()
{
 reset()
}

//deprecated window detection function

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
