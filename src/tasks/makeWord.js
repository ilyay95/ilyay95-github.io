import $ from 'jquery';
import '../../node_modules/jquery-ui/ui/widgets/sortable';
import { createTaskText, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

window.$ = $;
const str = 'Соберите слово из букв:';
const wordsArr = ['yellow', 'blue', 'white', 'black', 'pink', 'red','brown', 'green', 'orange', 'purple', 'grey'];
let index;
let word;

function createLettersDivs(parent, lettersArr) {
  const ul = document.createElement('ul');
  ul.id = 'sortable';
  const len = lettersArr.length;
  for (let i = 0; i < len; i += 1) {
    const li = document.createElement('li');
    li.classList.add('letters-container');
    li.innerText = lettersArr.splice(randNum(0, lettersArr.length - 1), 1);
    ul.appendChild(li);
  }
  parent.appendChild(ul);
  $(() => $('#sortable').sortable());
  document.getElementsByClassName('letters-container')[0].focus();
}

function checkAnswer() {
  pressEnterHandler(showSpellWindow);
  const rightAns = word;
  let userAns = '';
  for (let i = 0; i < word.length; i += 1) {
    userAns += document.getElementsByClassName('letters-container')[i].innerText;
  }
  makeSpell(userAns === rightAns);
}

export default function makeWord() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, wordsArr.length - 1);
  word = wordsArr[index];
  const letters = word.split('');
  clearElement(modalWindow);
  createTaskText(modalWindow, str);
  createLettersDivs(modalWindow, letters);
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
}
