import { createTaskText, createTaskInput, createTaskButton, randNum, makeSpell } from '../tasksModalWindowElements';
import isBlank from '../validation';
import wordsArr from './dictionary';
import { showSpellWindow } from '../../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../../modalWindow/modalWindow';

let index;
let word;

function checkAnswer() {
  pressEnterHandler(showSpellWindow);
  const userAns = document.getElementsByClassName('task-input')[0].value.toLowerCase();
  if (!isBlank(userAns)) {
    const rightAns = wordsArr[index][word];
    makeSpell(rightAns.indexOf(userAns) !== -1);
  }
}

export default function englishTranslate() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  word = Object.keys(wordsArr[index])[0];
  const str = `Переведите слово: ${word}`;
  clearElement(modalWindow);
  createTaskText(modalWindow, str);
  createTaskInput(modalWindow);
  const input = document.getElementsByClassName('task-input')[0];
  input.focus();
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
}
