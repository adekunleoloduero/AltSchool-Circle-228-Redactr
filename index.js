//the following function gets and seperate word to an array
const getWords = (str) => {
  let arr = str.split(" ");
  return arr;
}
// the following function will check if user enters the correct inputs 
const validateInput = (input1, input2, input3) => {
  if (input1.value == "" || input2.value == "" || (input3.value).length > 1) {
    if (input1.value == "") {
      input1.style = "border: 1px solid red";
      err.innerHTML = "Please provide the content";
    } else if (input2.value == "") {
      input1.style = "border: 1px solid green";
      input2.style = "border: 1px solid red";
      err.innerHTML = "Please provide the words to redact";
    } else if ((input3.value).length > 1) {
      input2.style = "border: 1px solid green";
      input3.style = "border: 1px solid red";
      err.innerHTML = "Please provide only one characher";
    }
    return false;
  }
  input1.style = "border: 1px solid green";
  input2.style = "border: 1px solid green";
  input3.style = "border: 1px solid green";
  err.innerHTML = "";
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

const replacer = (arr) => {
  let replaceArr = arr.map(item => {
    item = rep(item, replacement.value);
    return item;
  })
  return replaceArr;
}
// Advanced featured 
const wordCount = (sepWords) => {
  let matchCount = 0;
  sepWords.forEach(word => {
    let regex = new RegExp(word, "g");
    matchCount += (content.value).match(regex).length;
  });
  return matchCount;
}
const charCount = sepWords => {
  let matchCount = 0;
  sepWords.forEach(word => {
    let regex = new RegExp(word, "g");
    (content.value).match(regex).forEach(char => {
      matchCount += char.length;
    })
  });
  return matchCount;
}
const scannedWords = str => {
  return getWords(str.value).length;
}

const checkStat = () => {
  stats.innerHTML = `
    <h3>Stats</h3>
    <hr>
    <p>Scanned Word(s): <span>${scannedWords(content)} words</span></p>
    <p>Matched Word(s): <span>${wordCount(getWords(words.value))} words</span></p>
    <p>Character Count(s): <span>${charCount(getWords(words.value))} characters</span></p>
    <p>Time Completed: <span>900ms</span></p>
  `;
}

// getting elements with DOM 
const content = document.getElementById("content");
const words = document.getElementById("words");
const redactr = document.getElementById("form");
const replacement = document.getElementById("replacement");
const preview = document.getElementById("preview");
const err = document.getElementById("err");
const previewContainer = document.getElementsByClassName("preview-container")[0];
const howItWorks = document.getElementsByClassName("how-it-works")[0];
const stats = document.getElementsByClassName("stat")[0];
const backBtn = document.getElementsByClassName("back")[0];
const copy = document.getElementsByClassName("fa-clipboard")[0];
const socialBtn = document.querySelectorAll('.social-btn');

//this function handles every converstion at an event
function redactWords() {
  let formValidation = validateInput(content, words, replacement);
  if (formValidation) {
    let secretWords = getWords(words.value);
    let redactedArr = replacer(secretWords);
    let contentValue = content.value;

    for (let i = 0; i < secretWords.length; i++) {
      contentValue = contentValue.replaceAll(secretWords[i], redactedArr[i]);
    }

    preview.innerHTML = contentValue;
    previewContainer.style = "display: block;";
    howItWorks.style.display = "none";
    redactr.style.display = "none";

    checkStat();
  }
}

//submit event 
redactr.onsubmit = (e) => {
  e.preventDefault(); //prevents the default form submission
  redactWords();
}
// back button 
backBtn.onclick = () => {
  previewContainer.style = "display: none;";
  howItWorks.style.display = "block";
  redactr.style.display = "block";
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
})