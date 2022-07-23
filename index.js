//the following function gets and seperate word to an array
const getWords = (str) => {
  let arr = str.split(" ");
  return arr;
}
// This rot13Encoder uses the rot13 encryption algorithm to scramble the text provided by the user.
function rot13Encoder(str) {
  let alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rotResult;
  let result = '';
  //This will loop over all charaters in a word and replace them with a random char
  for (let i = 0; i < str.length; i++) {
    rotResult = alphabeth.indexOf(str[i]) + 13;
    if (alphabeth.indexOf(str[i]) === -1) {
      result += '' + str[i] + '';
    } else if (rotResult >= 26) {
      rotResult -= alphabeth.length
      result += '' + alphabeth[rotResult] + '';
    } else {
      result += '' + alphabeth[rotResult] + '';
    }
  }
  return result;
}

// the following function scrambles the text in the array with ROT13 and return an array of encrypted texts
const rot13 = (arr) => {
  let encodedArr = arr.map(item => rot13Encoder(item.toUpperCase()).toLowerCase())
  return encodedArr;
}

// getting elements with DOM 
const content = document.getElementById("content");
const words = document.getElementById("words");
const redactr = document.getElementById("form");
const preview = document.getElementById("preview");


//this function handles every converstion at an event
function redactWords() {
  let secretWords = getWords(words.value);
  let encodedArr = rot13(secretWords)
  let contentValue = content.value
  for (let i = 0; i < secretWords.length; i++) {
    contentValue = contentValue.replaceAll(secretWords[i], encodedArr[i])
  }
  preview.innerHTML = contentValue;
  preview.style = "width: 500px; padding: 20px; border-raduis: 10px; background-color: #f4f4f4; margin: 20px auto";
}

//submit event 
redactr.onsubmit = (e) => {
  e.preventDefault(); //prevents the default form submission
  redactWords()
}