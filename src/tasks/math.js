import { createTaskText, createTaskInput, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import isBlank from './validation';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

const signs = ['+', '-', '*'];
const minNum = 0;
const maxNum = 300;
let example;
let str;

function checkAnswer() {
  pressEnterHandler(showSpellWindow);
  const userAns = document.getElementsByClassName('task-input')[0].value;
  if (!isBlank(userAns)) {
    const rightAns = `${eval(example)}`;
    makeSpell(userAns === rightAns);
  }
}

export default function mathExample() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  example = `${randNum(minNum, maxNum)}${signs[randNum(0, signs.length - 1)]}${randNum(minNum, maxNum)}`;
  str = `Решите пример: ${example}`;
  clearElement(modalWindow);
  createTaskText(modalWindow, str);
  createTaskInput(modalWindow);
  const input = document.getElementsByClassName('task-input')[0];
  input.setAttribute('type', 'number');
  input.focus();
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
}
