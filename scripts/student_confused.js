//https://firebase.google.com/docs/web/learn-more#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"

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

let session_id = localStorage.getItem("SessionID")
let uid = localStorage.getItem("UID")


let example = document.querySelector('#example')
let slow = document.querySelector('#slow')
let repeat = document.querySelector('#repeat')
let comment = document.querySelector('#comment')
let skip = document.querySelector('#skip')

example.onclick = () => {
    push(ref(database, '/Sessions/' + session_id + '/complaints'), {
        user_id: uid,
        text: "Can you give an example?"
    }).then(function () {
        push(ref(database, '/Sessions/' + session_id + '/complaints/new'), {
            it: "works"
        }).then(function () { location.href = "student_session_main.html" })
    }
    )
}

slow.onclick = () => {
    push(ref(database, '/Sessions/' + session_id + '/complaints'), {
        user_id: uid,
        text: "Can you slow down?"
    }).then(function () {
        push(ref(database, '/Sessions/' + session_id + '/complaints/new'), {
            it: "works"
        }).then(function () { location.href = "student_session_main.html" })
    }
    )
}

repeat.onclick = () => {
    push(ref(database, '/Sessions/' + session_id + '/complaints'), {
        user_id: uid,
        text: "Can you repeat that?"
    }).then(function () {
        push(ref(database, '/Sessions/' + session_id + '/complaints/new'), {
            it: "works"
        }).then(function () { location.href = "student_session_main.html" })
    }
    )
}

skip.onclick = () => {
    location.href = "student_session_main.html"
}

comment
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            let user_comments = comment.value
            console.log(user_comments)
            push(ref(database, '/Sessions/' + session_id + '/complaints'), {
                user_id: uid,
                text: user_comments
            }).then(function () {
                push(ref(database, '/Sessions/' + session_id + '/complaints/new'), {
                    it: "works"
                }).then(function () { location.href = "student_session_main.html" })
            }
            )
        }})