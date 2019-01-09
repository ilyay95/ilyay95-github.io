import { createModalWindow, clearElement } from '../modalWindow/modalWindow';
import startGame from '../startGame/startGame';
import { pressEnterAndEscHandler } from '../playWithKeyboard/keyPressHandlers';

function createTextAboutRegistration(parent) {
  const div = document.createElement('div');
  div.classList.add('registration-div-with-text');
  const text = '<p>Здравствуй путник !' +
      ' Этот мир не настолько добр как кажется на первый взгляд.Он полон коварства и интриг, а так же врагов которые хотят причинить боль всему живому!</p>';
  div.innerHTML = text;
  parent.appendChild(div);
}

function createLabel(parent) {
  const label = document.createElement('label');
  label.classList.add('registration-label');
  label.innerText = 'Ведите  имя: ';
  label.htmlFor = 'registration-input';
  parent.appendChild(label);
}

function createRegistrationInput(parent) {
  const input = document.createElement('input');
  input.classList.add('registration-input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Дагот Ур');
  input.id = 'registration-input';
  parent.appendChild(input);
  input.focus();
}

function saveName() {
  let name = document.getElementById('registration-input').value;
  if (name === '') { name = 'Таинственный путник'; }
  if (localStorage.getItem('RecordsArr') === null) {
    const newRecArr = [{ name: `${name}`, killedMonsersAmmount: 0 }];
    localStorage.setItem('RecordsArr', JSON.stringify(newRecArr));
  } else {
    const recArr = JSON.parse(localStorage.getItem('RecordsArr'));
    recArr.push({ name: `${name}`, killedMonsersAmmount: 0 });
    localStorage.setItem('RecordsArr', JSON.stringify(recArr));
  }
}

function showGameWindow() {
  clearElement(document.body);
  startGame();
}

function goToGameWindow() {
  saveName();
  showGameWindow();
}

function createPlayButton(parent) {
  const button = document.createElement('button');
  button.classList.add('play-button');
  button.innerHTML = 'Играть!';
  parent.appendChild(button);
  button.addEventListener('click', saveName);
  button.addEventListener('click', showGameWindow);
}

export default function showRegistrationWindow() {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];

  createTextAboutRegistration(modalWindow);
  createLabel(modalWindow);
  createRegistrationInput(modalWindow);
  createPlayButton(modalWindow);
  pressEnterAndEscHandler(goToGameWindow);
}
