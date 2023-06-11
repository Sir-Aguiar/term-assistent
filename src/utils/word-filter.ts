import { keyInSelect, question, questionInt } from "readline-sync";
import { words as wordsDB } from "../../words.json";

/*
  Fazer extensão que lê e interpreta o HTML da página filtrando as possibilidades
*/

/* 
  Possíveis combinações de funcionalidades:
    - Letra X na posição X; containsAt()
    - Letra X não pertence a posição X; containsNotAt()
    - Letra X não existe na palavra; notContains()
*/

/* 
  Inserir um input
    - Quais posições ficaram verdes: 
    - Quais posições ficaram amarelas:
*/

const containsAt = (letter: string[], position: number[], words = wordsDB) => {
  let avaliableWords = words;

  letter.forEach((wordLetter, index) => {
    avaliableWords = avaliableWords.filter((word) => {
      return word[position[index] - 1] == wordLetter.toLowerCase();
    });
  });

  return avaliableWords;
};

const containsNotAt = (letters: string[], positions: number[][], words = wordsDB) => {
  // ["T"], [[1]]
  let avaliableWords = words;
  letters.forEach((letter, index) => {
    const lowerLetter = letter.toLowerCase();
    positions[index].forEach((position) => {
      avaliableWords = avaliableWords.filter((word) => {
        return word.includes(lowerLetter) && !(word[position - 1] == lowerLetter);
      });
    });
  });

  return avaliableWords;
};

const notContains = (letters: string[], words = wordsDB) => {
  const cannotHave = letters.join("").toLowerCase();
  const regex = new RegExp(`^(?!.*[${cannotHave}])[a-z]{5}$`);
  return words.filter((word) => regex.test(word));
};

let options = [
  "Letra X na posição X",
  "Letra X não pertence a posição X",
  "Letra X não existe na palavra",
  "Mostrar palavras possíveis",
];
let choice = keyInSelect(options, "insira o filtro que deseja inserir: ");
let myWords = wordsDB;
while (choice != -1) {
  if (choice == 0) {
    let letters = question("Insira as letras que você já sabe a posição (seprados por vírgula): ").split(",");
    let positions = question("Insira agora as respectivas posições de cada letra (separadas por vírgula): ")
      .split(",")
      .map((value) => parseInt(value));
    myWords = containsAt(letters, positions, myWords);
  }

  if (choice == 1) {
    const letters = question("Quais são as letras que você conhece: ").split(",");
    const positions: number[][] = [];
    letters.forEach((letter) => {
      positions.push(
        question(`Quais as posições você sabe que o ${letter} está: `)
          .split(",")
          .map((value) => parseInt(value)),
      );
    });
    myWords = containsNotAt(letters, positions, myWords);
  }
  if (choice == 2) {
    const letters = question("Quais são as letras que a palavra não possui: ").split(",");
    myWords = notContains(letters, myWords);
  }
  if (choice == 3) {
    myWords.forEach((word) => {
      console.log(`${word}`);
    });
  }

  choice = keyInSelect(options, "Insira o filtro que deseja inserir: ");
}
