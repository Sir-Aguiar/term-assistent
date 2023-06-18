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

interface IHaveNotAt {
  letter: string;
  position: number[];
}
interface IHaveAt {
  letter: string;
  position: number;
}

const containsAt = (data: IHaveAt[], words = wordsDB) => {
  let avaliableWords = words;
  /* [
  { letter: 's', position: 1 },    
  { letter: 'a', position: 2 },    
  { letter: 'o', position: 5 }     
] */
  avaliableWords = avaliableWords.filter((word) => {
    for (const hint of data) {
      if (word[hint.position - 1].toLowerCase() !== hint.letter.toLowerCase()) return false;
    }
    return true;
  });
  return avaliableWords;
};

const containsNotAt = (data: IHaveNotAt[], words = wordsDB) => {
  /* 
  [
  { letter: 'o', position: [ 2 ] },
  { letter: 'a', position: [ 5 ] },
  { letter: 'b', position: [ 4 ] }
]
  */
  let avaliableWords = words;
  data.forEach((hint) => {
    hint.position.forEach((hintPosition) => {
      avaliableWords = avaliableWords.filter((word) => {
        return word[hintPosition - 1] != hint.letter && word.includes(hint.letter);
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

export { containsAt, containsNotAt, notContains };
