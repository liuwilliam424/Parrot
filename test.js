let button = document.querySelector("button")

button.onclick = () => {
  Toastify({
    text: "This is a toast",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    offset: {
      x: "2em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function(){} // Callback after click
    
  }).showToast();
}

// Toastify({
//   text: "This is a toast",
//   duration: 3000,
//   destination: "https://github.com/apvarun/toastify-js",
//   newWindow: true,
//   close: true,
//   gravity: "top", // `top` or `bottom`
//   position: "left", // `left`, `center` or `right`
//   stopOnFocus: true, // Prevents dismissing of toast on hover
//   style: {
//     background: "linear-gradient(to right, #00b09b, #96c93d)",
//   },
//   onClick: function(){} // Callback after click
// }).showToast();