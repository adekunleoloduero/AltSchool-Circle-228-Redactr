//When the page loads for the first time
window.onload = () => {
  content.focus(); //Focus on the Content field
}


//the following function gets and seperate word to an array
const getWords = (str) => {
  let arr = str.split(" ");
  return arr;
}

// the following function will check if user enters the correct inputs 
const validateInput = (input1, input2, input3, input4) => {
  if (input1.value == "" || input2.value == "" || (input3.value).length > 1 || (input3.value.length > 0 && input4.value.length > 0)) {
    if (input1.value == "") {
      input1.style = "border: 2px solid red";
      showMessage('Please provide the content.');
    } else if (input2.value == "") {
      input1.style = "border: 2px solid green";
      input2.style = "border: 2px solid red";
      showMessage("Please provide the word (s) to scramble.");
    } else if (((input3.value).length > 1) && (input4.value == null || input4.value.length == 0)) {
      input1.style = "border: 2px solid green";
      input2.style = "border: 2px solid green";
      input3.style = "border: 2px solid red";
      showMessage("Character length cannot be greater than 1.");
    } else if (input3.value.length > 0 && input4.value.length > 0) {
      input1.style = "border: 2px solid green";
      input2.style = "border: 2px solid green";
      input3.style = "border: 2px solid red";
      input4.style = "border: 2px solid red";
      showMessage('Specify EITHER a character OR a word, NOT both.');
    }
    return false;
  }
  return true;
}


function rep(text, replaceWith = "#") {
  replaceWith = replaceWith == "" ? "#" : replaceWith;
  let replaceText = "";
  for (let i = 0; i < text.length; i++) {
    replaceText += "" + replaceWith + "";
  }
  return replaceText;
}


const replaceWithXter = (arr) => {
  let replaceArr = arr.map(item => {
    item = rep(item, replacement.value);
    return item;
  })
  return replaceArr;
}


/**
 * 
 * @param {*} wordsToScramble 
 * @returns 
 */
const replaceWithWord = (wordsToScramble) => {
  const scrambledWords = wordsToScramble.map(word => {
    word = wordReplacement.value;
    return word;
  });
  return scrambledWords;
}

// Advanced feature
// check for number of words redacted
const wordCount = (sepWords) => {
  // sepWords is a parameter of type array (expected)
  let matchCount = 0;
  sepWords.forEach(word => {
    // interates over each words in the array
    let regex = new RegExp(word, "gi"); //Regex that matches word and each case
    //regex match() returns an array
    matchCount += (content.value).match(regex).length; //takes a length of array and update matchCount
  });
  return matchCount;
}


const charCount = sepWords => {
  let matchCount = 0;
  sepWords.forEach(word => {
    let regex = new RegExp(word, "gi");
    (content.value).match(regex).forEach(char => {
      matchCount += char.length;
    })
  });
  return matchCount;
}


// checks the number of words scanned through 
const scannedWords = str => {
  return getWords(str.value).length;
}

// function that runs other function written for stats
const checkStat = () => {
  stats.innerHTML = `
    <h3>Stats</h3>
    <hr>
    <p>Scanned Word(s): <span>${scannedWords(content)} ${scannedWords(content) < 2 ? "word" : "words"}</span></p>
    <p>Matched Word(s): <span>${wordCount(getWords(words.value))} ${wordCount(getWords(words.value)) < 2 ? "word" : "words"}</span></p>
    <p>Character Count(s): <span>${charCount(getWords(words.value))} ${charCount(getWords(words.value)) < 2 ? "character" : "characters"}</span></p>
    <p>Time Completed: <span>${timeTaken.toFixed(2)}ms</span></p>
  `;
}

// getting elements with DOM 
const content = document.getElementById("content");
const words = document.getElementById("words");
const redactr = document.getElementById("form");
const replacement = document.getElementById("replacement");
const wordReplacement = document.getElementById('word-replacement');
const preview = document.getElementById("preview");
const err = document.querySelector("#err");
const previewContainer = document.getElementsByClassName("preview-container")[0];
const howItWorks = document.getElementsByClassName("how-it-works")[0];
const stats = document.getElementsByClassName("stat")[0];
const backBtn = document.getElementsByClassName("back")[0];
const copy = document.getElementsByClassName("fa-clipboard")[0];
const socialBtn = document.querySelectorAll('.social-btn');

let timeTaken;



const replacementType = () => {
  const xterReplacement = document.getElementById('replacement').value;
  const wordReplacement = document.getElementById('word-replacement').value;

  if ((xterReplacement != null || xterReplacement.length > 0) && (wordReplacement == null || wordReplacement.length < 1)) {
    return 0;
  } else if ((xterReplacement == null || xterReplacement.length < 1) && (wordReplacement != null || wordReplacement.length > 0)) {
    return 1;
  }
}


/**
 * 
 * @param {*} message 
 */
function showMessage(message) {
  //Clear previous message
  clearPreviousMessage();

  //Insert new message
  const form = document.getElementById('form');
  const firstChildElem = form.lastElementChild;
  const newMessage = document.createElement('p');
  newMessage.id = 'err';
  newMessage.textContent = `Warning - ${message}`;
  newMessage.classList.add('err');
  form.insertBefore(newMessage, firstChildElem);
}


function clearPreviousMessage() {
  if (document.getElementById('form').style.display != "none" && (document.getElementById('err') != null)) {
    const prevMessage = document.getElementById('err');
    prevMessage.remove();
  }
}

//this function handles every converstion at an event
function redactWords() {
  let formValidation = validateInput(content, words, replacement, wordReplacement);
  let scramblingPatterns; //Pattern to be applied to scrambled words
  let wordsToScramble = getWords(words.value);
  if (formValidation) {

    content.style = "border: 2px solid green";
    words.style = "border: 2px solid green";
    replacement.style = "border: 2px solid green";
    wordReplacement.style = "border: 2px solid green";

    if (replacementType() == 0) {
      scramblingPatterns = replaceWithXter(wordsToScramble);
    } else if (replacementType() == 1) {
      scramblingPatterns = replaceWithWord(wordsToScramble);
    } 
  } else {
    return;
  }


  let contentValue = content.value;

  for (let i = 0; i < wordsToScramble.length; i++) {
    contentValue = contentValue.replaceAll(wordsToScramble[i], scramblingPatterns[i]);
  }

  preview.innerHTML = contentValue;
  previewContainer.style = "display: block;";
  howItWorks.style.display = "none";
  redactr.style.display = "none";
}



//submit event 
redactr.onsubmit = (e) => {
  e.preventDefault(); //prevents the default form submission
  let start = performance.now();
  redactWords();
  let end = performance.now();
  timeTaken = end - start;
  checkStat();
}

// back button 
backBtn.onclick = () => {
  previewContainer.style = "display: none;";
  howItWorks.style.display = "block";
  redactr.style.display = "block";

  clearPreviousMessage();
  document.getElementById('content').focus();
}


copy.onclick = () => {
  //NB. doesn't work on iframes, switch to full display
  navigator.clipboard.writeText(preview.innerText);
  alert("Copied!");
}

socialBtn.forEach(btn => {
  btn.onclick = () => {
    switch (btn.classList[1]) {
      case "whatsapp":
        btn.setAttribute('href', `https://wa.me/?text=${(preview.innerText).toLowerCase()}`)
        break;
      case "sms":
        btn.setAttribute('href', `sms:body=${(preview.innerText).toLowerCase()}`)
        break;
      case "mail":
        btn.setAttribute('href', `mailto:subject=secretmessage&body=${(preview.innerText).toLowerCase()}`)
        break;
      default:
        console.log("error");
    }
  }
});