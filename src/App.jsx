//css
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// data
import WordsList from './data/Words';

// Components
import StartScreen from './components/startScreen/StartScreen';
import Game from './components/game/Game';
import GameOver from './components/gameOver/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(WordsList); 

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guesssedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)]; 

    return {word, category};
  }

  const startGame = () => {
    const {word, category} = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();
    if(guesssedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
    }
    // setGameStage(stages[2].name);
  }

  const reestart = () =>{
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
      <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters}
        guesssedLetters={guesssedLetters}
        wrongLetters={wrongLetters}
        score={score}
        guesses={guesses}
      />}
      {gameStage === "end" && <GameOver reestart={reestart}/>}
      
    </div>
  );
}

export default App;
