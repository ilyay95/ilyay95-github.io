import createCharacters from '../createCharacter/createCharacter';
import createMonsterName from '../createCharacter/createMonsterName';
import { showSpellWindow } from '../createSpellWindow/createSpellWindow';
import createHealthBar from '../charactersHealth/createHealthBar';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';

const BACKGROUND_WIDTH = 1893;
const BACKGROUND_HEIGHT = 1076;

function createCanvas(parent) {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = BACKGROUND_WIDTH;
  canvas.height = BACKGROUND_HEIGHT;
  parent.appendChild(canvas);
}

function createAttackButton(parent) {
  const button = document.createElement('div');
  button.classList.add('attack-button');
  button.innerText = 'Ударить';
  parent.appendChild(button);
  document.getElementsByClassName('attack-button')[0].addEventListener('click', showSpellWindow);
}

export default function createGameSpace() {
  const container = document.createElement('div');
  container.classList.add('game-container');
  document.body.appendChild(container);

  const healthContainer = document.createElement('div');
  healthContainer.classList.add('health-container');
  container.appendChild(healthContainer);

  const recArr = JSON.parse(localStorage.getItem('RecordsArr'));
  createHealthBar(healthContainer, recArr[recArr.length - 1].name);
  createHealthBar(healthContainer, createMonsterName());
  createAttackButton(container);
  document.getElementsByClassName('attack-button')[0].focus();
  pressEnterHandler(showSpellWindow);
  createCanvas(container);
  createCharacters();
}
