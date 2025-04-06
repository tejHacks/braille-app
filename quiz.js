const brailleMap = {
    A: '⠁', B: '⠃', C: '⠉', D: '⠙', E: '⠑',
    F: '⠋', G: '⠛', H: '⠓', I: '⠊', J: '⠚',
    K: '⠅', L: '⠇', M: '⠍', N: '⠝', O: '⠕',
    P: '⠏', Q: '⠟', R: '⠗', S: '⠎', T: '⠞',
    U: '⠥', V: '⠧', W: '⠺', X: '⠭', Y: '⠽', Z: '⠵'
  };
  
  const letters = Object.keys(brailleMap);
  let currentLetter = '';
  
  const quizLetter = document.getElementById('quizLetter');
  const options = document.getElementById('options');
  const feedback = document.getElementById('feedback');
  
  function getRandomLetter(exclude = '') {
    let pick;
    do {
      pick = letters[Math.floor(Math.random() * letters.length)];
    } while (pick === exclude);
    return pick;
  }
  
  function startQuiz() {
    feedback.textContent = '';
    options.innerHTML = '';
    
    currentLetter = getRandomLetter();
    quizLetter.textContent = currentLetter;
    const correct = brailleMap[currentLetter];
  
    // Generate 2 wrong answers
    let distractors = [];
    while (distractors.length < 2) {
      let wrongLetter = getRandomLetter(currentLetter);
      let wrongBraille = brailleMap[wrongLetter];
      if (!distractors.includes(wrongBraille)) {
        distractors.push(wrongBraille);
      }
    }
  
    const allOptions = [correct, ...distractors];
    allOptions.sort(() => Math.random() - 0.5); // shuffle
  
    allOptions.forEach(symbol => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-primary braille-option';
      btn.textContent = symbol;
      btn.onclick = () => checkAnswer(symbol === correct);
      options.appendChild(btn);
    });
  }
  
  function checkAnswer(isCorrect) {
    feedback.textContent = isCorrect ? '✅ Correct!' : '❌ Nope, try the next one!';
    if (isCorrect) {
      const voice = new SpeechSynthesisUtterance(`Correct. That is the Braille for ${currentLetter}`);
      speechSynthesis.speak(voice);
    } else {
      const voice = new SpeechSynthesisUtterance(`That's not right. Try again.`);
      speechSynthesis.speak(voice);
    }
  }
  