// braille.js

const brailleMap = {
    A: '⠁', B: '⠃', C: '⠉', D: '⠙', E: '⠑',
    F: '⠋', G: '⠛', H: '⠓', I: '⠊', J: '⠚',
    K: '⠅', L: '⠇', M: '⠍', N: '⠝', O: '⠕',
    P: '⠏', Q: '⠟', R: '⠗', S: '⠎', T: '⠞',
    U: '⠥', V: '⠧', W: '⠺', X: '⠭', Y: '⠽', Z: '⠵'
  };
  
  const letterGrid = document.getElementById('letterGrid');
  const selectedLetter = document.getElementById('selectedLetter');
  const brailleSymbol = document.getElementById('brailleSymbol');
// DOM selection for the elements in the HTML File
  
  Object.keys(brailleMap).forEach(letter => {
    // loops through all the keys in the Object and throw em out(creates a button first, attach an event handler to it and then, show content through it too)
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary letter-box';
    btn.textContent = letter;
    btn.addEventListener('click', () => {
      speakLetter(letter);
      selectedLetter.textContent = `Letter: ${letter}`;
      brailleSymbol.textContent = brailleMap[letter];
    });
    letterGrid.appendChild(btn);
  });
  

//   attach an event fotr speaking through the browser when a button is clicked
  function speakLetter(letter) {
    const utterance = new SpeechSynthesisUtterance(`This is the Braille for ${letter}`);
    speechSynthesis.speak(utterance);
  }
  