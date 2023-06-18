const Letter = (content) => {
  const letter = document.createElement("div");
  letter.classList.add("letter");
  letter.innerText = content;
  return letter;
};

const appendLetters = (contentDiv, word) => {
  for (const letter of word) {
    contentDiv.appendChild(Letter(letter));
  }
};

const appendWord = (word) => {
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("letters");
  appendLetters(contentDiv, word);
  document.body.appendChild(contentDiv);
};
