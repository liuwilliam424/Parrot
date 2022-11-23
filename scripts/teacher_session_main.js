import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, update, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { Timestamp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

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

let end_button = document.querySelector('#end_session_button')
end_button.onclick = () => { location.href = "/html/teacher_analytics.html" }

let confused = document.querySelector('#confused')
let okay = document.querySelector('#okay')
let understanding = document.querySelector('#understanding')
let num_confused = 0
let num_okay = 0
let num_understanding = 0

var xValues = ["Confused", "Okay", "Understanding"];
var yValues = [num_confused, num_okay, num_understanding, 0];
var barColors = ["red", "orange", "green"];

var chart = new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: { display: false },
        title: {
            display: false,
            text: ""
        }
    }
});

function update_session_meta(session_id, UID) {
    console.log("writing user data")
    const db = getDatabase();
    update(ref(db, '/Sessions/' + session_id + '/'), {
        teacherID: UID,
        time_started: Timestamp.now()
    });
}

update_session_meta(localStorage.getItem("SessionID"), localStorage.getItem("UID"))

let sessionID = localStorage.getItem("SessionID")

const dbRef = ref(database);
const responses_ref = ref(database, `Sessions/${sessionID}/responses`);

onValue(responses_ref, (snapshot) => {
    console.log("data was changed")
    let recent_data = new Map();
    get(child(dbRef, `Sessions/${sessionID}/responses`)).then((snapshot) => {
        if (snapshot.exists()) {
            (snapshot.forEach(
                function (datum) {
                    let UID = datum.val()['UID']
                    let rating = datum.val()['rating']
                    recent_data.set(UID, rating)
                }
            ));

            recent_data.forEach(
                function (value) {
                    console.log(value)
                    if (value == 1) {
                        num_confused += 1
                    }
                    else if (value == 2) {
                        num_okay += 1
                    }
                    else if (value == 3) {
                        num_understanding += 1
                    }
                }
            )

            console.log(num_confused, num_okay, num_understanding)
            confused.innerHTML = num_confused
            okay.innerHTML = num_okay
            understanding.innerHTML = num_understanding


            chart.data.datasets[0].data = [num_confused, num_okay, num_understanding, 0]
            chart.update()

            num_confused = num_okay = num_understanding = 0


        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        alert("something went wrong, who knows what")
        console.error(error);
    });

});

