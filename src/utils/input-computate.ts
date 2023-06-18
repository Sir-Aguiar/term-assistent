import { containsAt, containsNotAt, notContains } from "./word-filter";
import words from "./words";
const rightGuess = "sabio";
let possibleGuesses: string[] = words;

interface IHaveNotAt {
  letter: string;
  position: number[];
}
interface IHaveAt {
  letter: string;
  position: number;
}

// Todas as letras que não se encontram na posição certa
const haveNotAt: IHaveNotAt[] = [];

// Todas as letras que se encontram na posição certa
const haveAt: IHaveAt[] = [];
const haveNot: string[] = [];

const computateUserInput = (userInput: string) => {
  // Todas as letras que não se encontram na palavra
  const lettersArray = userInput.split("");
  lettersArray.forEach((letter) => {
    if (!rightGuess.includes(letter)) {
      haveNot.push(letter);
    }
  });

  for (let index = 0; index < 5; index++) {
    if (rightGuess.includes(userInput[index])) {
      if (rightGuess[index] === userInput[index]) {
        haveAt.push({ letter: userInput[index], position: index + 1 });
      } else {
        const position = haveNotAt.findIndex((value) => value.letter === userInput[index]);
        if (position === -1) {
          haveNotAt.push({ letter: userInput[index], position: [index + 1] });
        } else {
          if (!haveNotAt[position].position.includes(index + 1)) {
            haveNotAt[position].position.push(index + 1);
          }
        }
      }
    }
  }
  possibleGuesses = notContains(haveNot, possibleGuesses);
  possibleGuesses = containsAt(haveAt, possibleGuesses);
  possibleGuesses = containsNotAt(haveNotAt, possibleGuesses);
};

