let temp_b1 = document.querySelector('#b1')
temp_b1.onclick = () => {location.href = "/html/student_session_main.html"}

let temp_b2 = document.querySelector('#b2')
temp_b2.onclick = () => {location.href = "/html/student_session_main.html"}

let temp_b3 = document.querySelector('#b3')
temp_b3.onclick = () => {location.href = "/html/student_session_main.html"}

let confused_text = document.querySelector('#text4')

let temp_b4 = document.querySelector('#b4')
temp_b4.onclick = () => {
    console.log("Confused text: " + confused_text.value)
    localStorage.setItem("Confused text: ", confused_text.value)
    location.href = "/html/student_session_main.html"

}

let temp_b5 = document.querySelector('#b5')
temp_b5.onclick = () => {location.href = "/html/student_session_main.html"}
