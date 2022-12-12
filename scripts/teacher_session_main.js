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

let end_button = document.querySelector("#end_session_button")
end_button.onclick = () => { location.href = "/html/teacher_end.html" }

let confused = document.querySelector('#confused')
let okay = document.querySelector('#okay')
let understanding = document.querySelector('#understanding')
let num_confused = 0
let num_okay = 0
let num_understanding = 0
let bod = document.querySelector('body')

var xValues = ["Confused", "Okay", "Understanding"];
var yValues = [num_confused, num_okay, num_understanding, 0];
var barColors = ["red", "orange", "green"];

let blinks = 0;
let nIntervId;

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
let session_code = document.querySelector("#session_code")
session_code.innerHTML = sessionID

const dbRef = ref(database);
const responses_ref = ref(database, `Sessions/${sessionID}/responses`);

let users = new Map()

get(child(dbRef, `Users/`)).then((snapshot) => {
    (snapshot.forEach(
        function (item) {
            users.set(item.key, item.val()['name'])
        }
    ))
}).catch((error) => {
    console.error(error);
});

let confused_ori, okay_ori, understanding_ori;

onValue(responses_ref, (snapshot) => {
    console.log("data was submitted by student")
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


            // console.log(num_confused, num_okay, num_understanding)
            confused.innerHTML = num_confused
            okay.innerHTML = num_okay
            understanding.innerHTML = num_understanding

            chart.data.datasets[0].data = [num_confused, num_okay, num_understanding, 0]
            chart.update()


            function blink() {
                // console.log(bod.style.outline)
                blinks += 1
                // console.log(blinks)
                if (bod.style.getPropertyValue('outline')) {
                    bod.style.outline = "";
                    // console.log("turned white")
                }
                else if (bod.style.getPropertyValue('outline') == "") {
                    bod.style.outline = "red solid 60px";
                    // console.log("turned red")
                }
                if (blinks >= 10) {
                    stopBlink()
                }
            }


            function useBlink() {
                // check if an interval has already been set up
                if (!nIntervId) {
                    nIntervId = setInterval(blink, 250);
                }
            }

            function stopBlink() {
                clearInterval(nIntervId);
                // release our intervalID from the variable
                nIntervId = null;
                bod.style.outline = "";
            }

            let total = num_confused + num_okay + num_understanding;

            let threshold1 = parseInt(0.25 * total)
            let threshold2 = parseInt(0.5 * total)
            let threshold3 = parseInt(0.75 * total)

            // console.log("threshold1 " + threshold1)
            // console.log("num_confused " + num_confused)
            // console.log("confused_ori " + confused_ori)
            if (num_confused == threshold1 && confused_ori != threshold1) {
                console.log("used blink")
                useBlink()
                blinks = 0
            }

            if (num_confused == threshold2 && confused_ori != threshold2) {
                useBlink()
                blinks = 0
            }

            if (num_confused == threshold3 && confused_ori != threshold3) {
                useBlink()
                blinks = 0
            }

            confused_ori = num_confused;
            okay_ori = num_okay;
            understanding_ori = num_understanding;

            num_confused = num_okay = num_understanding = 0



        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        alert("something went wrong, who knows what")
        console.error(error);
    });

});


const naughty_boys = ref(database, `Sessions/${sessionID}/naughty_boys`);
let badnesses = new Map();
let badness_current = ""
let badness_prev = ""
let should_toast = new Map();
let toasts = new Map();

let first = true;

onValue(naughty_boys, (snapshot) => {
    if (snapshot.exists()) {
        (snapshot.forEach(
            function (datum) {
                let user_id = datum.val()['user_id']
                let badness = datum.val()['badness']

                badness_current = badness
                badness_prev = badnesses.get(user_id)

                badnesses.set(user_id, badness)
                if (badness_current == "bad" && badness_prev == "good") {
                    // console.log("turned bad")
                    should_toast.set(user_id, "turned bad")
                }
                if (badness_current == "good" && badness_prev == "bad") {
                    // console.log("turned good")
                    should_toast.set(user_id, "turned good")
                }

            }
        ));
    }
    if (!first) {
        should_toast.forEach(
            function (value, key) {
                let name = users.get(key)
                if (!name) {
                    console.log("User ID Failure")
                    return false
                }
                if (value == "turned bad") {
                    console.log("got off tab")

                    let temp = Toastify({
                        text: `${name} isn't on their tab!`,
                        duration: -1,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "left", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "blue"
                        },
                    })
                    if (!toasts.has(key)) {
                        temp.showToast();
                        toasts.set(key, temp)
                    }
                }
                else if (value == "turned good") {
                    console.log("back on tab");
                    let temp_new = toasts.get(key);
                    temp_new.hideToast();
                    toasts.delete(key)
                }
            }
        )
    }
    first = false
});


const complaints_ref = ref(database, `Sessions/${sessionID}/complaints/new`);
let users_complaining = new Map()
let complaints_display = new Map()

function delete_user_complaints(id) {
    console.log("deleting user complaints...")
    get(child(dbRef, `Sessions/${sessionID}/complaints`)).then((snapshot) => {
        if (snapshot.exists()) {
            (snapshot.forEach(
                function (datum) {
                    let response = datum.key
                    if (datum.val()['user_id'] == id)
                        update(ref(database, `Sessions/${sessionID}/complaints/${response}`), {
                            text: null,
                        });
                }
            ));

        } else {
            console.log("No data available");
        }
    })
    users_complaining.forEach(function(value, key){
        if (key == id){
            users_complaining.delete(id)
        }
    });
}

onValue(complaints_ref, () => {
    console.log("happened")
    get(child(dbRef, `Sessions/${sessionID}/complaints`)).then((snapshot) => {
        if (snapshot.exists()) {
            (snapshot.forEach(
                function (datum) {
                    let user_id = datum.val()['user_id']
                    let text = datum.val()['text']
                    if (text) {
                        users_complaining.set(user_id, text)
                    }
                }
            ));
        }
        if (!first) {
            console.log("joe")
            users_complaining.forEach(
                function (value, key) {
                    let name = users.get(key)

                    let temp = Toastify({
                        key: key,
                        text: value,
                        duration: 30000,
                        close: true,
                        gravity: "top", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "purple"
                        },
                        callback: function () {
                            complaints_display.delete(key);
                            delete_user_complaints(key)
                        }
                    })
                    if (!complaints_display.get(key))
                        temp.showToast();
                    complaints_display.set(key, temp)

                }
            )
        }
    })
    first = false
});

