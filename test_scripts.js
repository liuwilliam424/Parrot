let mybutton = document.querySelector("button")

let heading = document.querySelector("#jared")

function joe (){
    const name = prompt("enter name")
    localStorage.setItem("Joe", name)
    heading.textContent = name
}

mybutton.onclick = () => {joe();}

name = "joe"

function greeting(name) {
    alert(`Hello, ${name}`);
  }
  
  function processUserInput(callback) {
    const name = prompt("Please enter your name.");
    callback(name);
  }
  
  processUserInput(greeting);

doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
      doThirdThing(newResult, function (finalResult) {
        console.log(`Got the final result: ${finalResult}`);
      }, failureCallback);
    }, failureCallback);
  }, failureCallback);