import { createSlice } from '@reduxjs/toolkit';
import words from '../../app/words';

const wordList = words.filter((word) => (!(/\W/gi.test(word))));

const initialState = {
  randomWord: wordList[Math.floor(Math.random() * wordList.length)],
  guessedLetters: [],
  lives: 7,
  score: 0,
  highScore: 0
};

const hangmanSlice = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
    newGame: (state) => {
      state.randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      state.guessedLetters = [];
      state.lives = 7;
      state.score = 0;
    },
    guess: (state, action) => {
      console.log(state);
      state.guessedLetters.push(action.payload);
    },
    pointCounter: (state, action) => {
      state.score += action.payload;
    },
    newHighScore: (state) => {
      state.highScore = state.score;
    }
  }
});

// console.log(cartSlice);
export const { newGame, guess, pointCounter, newHighScore } =
  hangmanSlice.actions;

export default hangmanSlice.reducer;
