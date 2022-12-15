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

const dbRef = ref(database);
let sessionID = localStorage.getItem("SessionID")

let vert = document.querySelector('.container_vert')


function generateTable(user, user_data) {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    const capt = document.createElement('caption')
    const capt_text = document.createTextNode(user)
    capt.appendChild(capt_text)
    tbl.appendChild(capt);

    const row_top = document.createElement('tr')

    const cell_one = document.createElement("th");
    const cellText_one = document.createTextNode(`Time`);
    cell_one.appendChild(cellText_one);
    row_top.appendChild(cell_one);

    const cell_two = document.createElement("th");
    const cellText_two = document.createTextNode(`Rating`);
    cell_two.appendChild(cellText_two);
    row_top.appendChild(cell_two);
    tblBody.appendChild(row_top);

    // creating all cells
    user_data.forEach(
        function (datum) {
            // creates a table row
            const row = document.createElement("tr");

            let time_raw = datum[0]
            let rating = datum[1]

            let date = new Date(time_raw * 1000)
            let hours = date.getHours()
            hours = hours % 12
            if (hours == 0) {
                hours = 12
            }
            hours.toString().padStart(2, '0')
            minutes.toString().padStart(2,'0')
            let minutes = date.getMinutes()
            let time = `${hours}:${minutes}`

            for (let i = 0; i < 2; i++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                if (i == 0) {
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode(time);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                if (i == 1) {
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode(rating);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

            }

            // add the row to the end of the table body
            tblBody.appendChild(row);
        })

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    vert.appendChild(tbl);
    // // sets the border attribute of tbl to '2'
    // tbl.setAttribute("border", "2");
}

let recent_data = new Map();

get(child(dbRef, `Sessions/${sessionID}/responses`)).then((snapshot) => {
    if (snapshot.exists()) {
        (snapshot.forEach(
            function (datum) {
                let UID = datum.val()['UID']
                recent_data.set(UID, [])
            }
        ));
        (snapshot.forEach(
            function (datum) {
                let UID = datum.val()['UID']
                let rating = datum.val()['rating']
                let time = datum.val()['time']['seconds']

                let data_for_user = recent_data.get(UID)
                data_for_user.push([time, rating])

            }
        ));
        console.log(recent_data)
        let users = new Map()

        get(child(dbRef, `Users/`)).then((snapshot) => {
            (snapshot.forEach(
                function (item) {
                    users.set(item.key, item.val()['name'])
                    // console.log(users)
                }
            )).then(
                recent_data.forEach(
                    function (rating, user) {
                        // console.log(users);
                        generateTable(users.get(user), rating)
                    }
                )).catch((error) => console.log(error))
        }).catch((error) => console.log(error))

    } else {
        console.log("No data available");
    }
}).catch((error) => {
    alert("something went wrong, who knows what")
    console.error(error);
});

let end_button = document.querySelector("#end_session_button")
end_button.onclick = () => { location.href = "../html/teacher_end.html" }
