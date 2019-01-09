import { createTaskText, createTaskInput, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import isBlank from './validation';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

let index;
const wordsArr = ['hat', 'flower', 'qween', 'egg', 'tree'];

function checkAnswer() {
  const userAns = document.getElementsByClassName('task-input')[0].value.toLowerCase();
  pressEnterHandler(showSpellWindow);
  if (!isBlank(userAns)) {
    const rightAns = wordsArr[index];
    makeSpell(rightAns === userAns);
  }
}

export default function wordByPicture() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  const str = 'Слово на картинке:';
  clearElement(modalWindow);
  createTaskText(modalWindow, str);

  const picture = document.createElement('img');
  picture.classList.add('picture-for-word');
  picture.src = `./images/wordByPicture/${wordsArr[index]}.jpg`;
  modalWindow.appendChild(picture);

  createTaskInput(modalWindow);
  const input = document.getElementsByClassName('task-input')[0];
  input.focus();
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
}
