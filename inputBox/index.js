document.querySelector('#rangeInput').addEventListener('change', handleInput);

var enteredNumbers = [];

function handleInput(evt) {
  console.log(evt.target.value);
}

enteredNumbers