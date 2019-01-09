import $ from 'jquery';
import '../../node_modules/jquery-ui/ui/widgets/sortable';
import { createTaskText, createTaskButton, randNum, makeSpell } from './tasksModalWindowElements';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

window.$ = $;
const str = 'Соберите предложение из слов:';
const sentencesArr = ['I am a good worker',
  'My name is Ana',
  'I like fresh vegetables',
  'I am reading a book'];
let index;
let sentence;

function createWordsDivs(parent, wordsArr) {
  const ul = document.createElement('ul');
  ul.id = 'sortable';
  const len = wordsArr.length;
  for (let i = 0; i < len; i += 1) {
    const li = document.createElement('li');
    li.classList.add('words-container');
    li.innerText = wordsArr.splice(randNum(0, wordsArr.length - 1), 1);
    ul.appendChild(li);
  }
  parent.appendChild(ul);
  $(() => $('#sortable').sortable());
  document.getElementsByClassName('words-container')[0].focus();
}

function checkAnswer() {
  pressEnterHandler(showSpellWindow);
  const rightAns = sentence;
  let userAns = '';
  const len = document.getElementsByClassName('words-container').length;
  for (let i = 0; i < len - 1; i += 1) {
    userAns += `${document.getElementsByClassName('words-container')[i].innerText} `;
  }
  userAns += `${document.getElementsByClassName('words-container')[len - 1].innerText}`;
  makeSpell(userAns === rightAns);
}

export default function makeSentence() {
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  index = randNum(0, sentencesArr.length - 1);
  sentence = sentencesArr[index];
  const words = sentence.split(' ');
  clearElement(modalWindow);
  createTaskText(modalWindow, str);
  createWordsDivs(modalWindow, words);
  createTaskButton(modalWindow, checkAnswer);
  pressEnterHandler(checkAnswer);
}
