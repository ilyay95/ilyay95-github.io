import createCharacters from '../createCharacter/createCharacter';
import createMonsterName from '../createCharacter/createMonsterName';
import { createModalWindow, closeModalWindow } from '../modalWindow/modalWindow';

function nextLevelTitle(parent, level) {
  const title = document.createElement('h3');
  title.classList.add('next-level-title');
  title.innerHTML = `Уровень ${level}`;
  parent.appendChild(title);
}

export default function goToTheNextLevel(level) {
  createModalWindow();
  const modalWindow = document.getElementsByClassName('modal-window')[0];
  modalWindow.classList.add('new-level-modal-window');
  document.getElementsByClassName('close')[0].remove();
  nextLevelTitle(modalWindow, level);
  setTimeout(
    () => {
      closeModalWindow();
      createCharacters();
      const characterName = document.getElementsByClassName('character-name')[1];
      characterName.innerText = createMonsterName();
    }, 4000
  );

  const healthBar = document.getElementsByClassName('health-bar')[1];
  const percentHealthBar = document.getElementsByClassName('percent-health-bar')[1];
  percentHealthBar.style.width = `${healthBar.clientWidth}px`;
  percentHealthBar.innerText = '100%';
}
