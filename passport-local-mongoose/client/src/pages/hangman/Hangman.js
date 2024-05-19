import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newGame, guess, pointCounter, newHighScore } from "../../features/hangman/hangmanSlice";
import "./Hangman.css";

function GameDisplay({ gameData }) {
  return (
    <div id="Game-Display" className={gameData.wordGuessed ? "green" : gameData.chancesLeft <= 0 ? "red" : "blue"}>
      <div id="Game-Display-header">
        <h1 id="Game-title">Hangman</h1>
        <div id="stats">
          <p>Lives: {gameData.chancesLeft}</p>
          <p>Score: {gameData.score < 10 ? `00${gameData.score}` : gameData.score < 100 ? `0${gameData.score}` : gameData.score}</p>
        </div>
      </div>
      <div id="Game-screen">
        <h4 id="message">{(!gameData.wordGuessed && gameData.chancesLeft > 0)
          ? `Guess the ${gameData.randomWord.length} letter word`
          : `${gameData.wordGuessed ? "You Win!" : "Try again...."} The word was ${gameData.randomWord.toUpperCase()}`}
        </h4>
        <div id="hiddenWord">
          {gameData.wordLetters.map((letter, x) => (<p key={`letter${x}`}>{gameData.guessedLetters.indexOf(letter) > -1 ? letter : "_"}</p>))}
        </div>
      </div>
    </div>
  );
}

function GameButton({ letter, gameData }) {
  const dispatch = useDispatch();
  function checkGuess() {
    if (gameData.guessedLetters.indexOf(letter) < 0 && !gameData.wordGuessed && gameData.chancesLeft > 0) {
      dispatch(guess(letter));
      if (gameData.wordLetters.indexOf(letter) > -1) {
        dispatch(pointCounter(5 * gameData.chancesLeft));
      }
    }
  }
  return (
    <button
      className={gameData.correctLetters.indexOf(letter) > -1 ? "buttons correct" : gameData.wrongLetters.indexOf(letter) > -1 ? "buttons wrong" : "buttons"}
      onClick={() => checkGuess()}>
      {letter}
    </button>
  );
}

function GameControls({ gameData }) {
  const dispatch = useDispatch();
  return (
    <div id="Game-Controls">
      <button onClick={() => dispatch(newGame())}>New Game</button>
      <div className="letters">
        {gameData.alphabet.map((letter, letterIndex) => (
          <GameButton
            key={letterIndex}
            letter={letter}
            gameData={gameData}/>
        ))}
      </div>
    </div>
  );
}

function Hangman() {
  const dispatch = useDispatch();
  const { randomWord, guessedLetters, lives, score, highScore } = useSelector((store) => store.hangman)
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  const wordLetters = randomWord.slice().toUpperCase().split("");
  const correctLetters = guessedLetters.filter((letter) => wordLetters.indexOf(letter) > -1);
  const wrongLetters = guessedLetters.filter((letter) => wordLetters.indexOf(letter) < 0);
  const wordGuessed = wordLetters.every((letter) => guessedLetters.indexOf(letter) > -1);
  useEffect(() => {
    if (score >= highScore) {
      dispatch(newHighScore());
    }
  });
  const gameData = {
    alphabet: alphabet,
    randomWord: randomWord,
    wordLetters: wordLetters,
    guessedLetters: guessedLetters,
    correctLetters: correctLetters,
    wrongLetters: wrongLetters,
    chancesLeft: (lives - wrongLetters.length),
    score: score,
    highScore: highScore,
    wordGuessed: wordGuessed
  }
  return (
    <div id="Hangman">
      <GameDisplay
        gameData={gameData}/>
      <GameControls
        gameData={gameData}/>
    </div>
  );
}

export default Hangman;