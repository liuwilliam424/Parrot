let mybutton = document.querySelector("button")

let heading = document.querySelector("#jared")

function joe (){
  alert('You are a poo poo, ${name}')
    const name = prompt("enter name")
    localStorage.setItem("Joe", name)
    heading.textContent = name
}

mybutton.onclick = () => {joe();}

let name = "joe"

function greeting(name) {
  name = prompt("hhhiiiiiii waszzzur nname")
  alert(`Hello, ${name}`);
  }
  
  
greeting();
