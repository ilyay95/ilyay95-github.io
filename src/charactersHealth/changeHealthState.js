import createRecordsTable from '../createRecordsTable/createRecordsTable';
import goToTheNextLevel from '../goToTheNextLevel/goToTheNextLevel';

let killedMonsterCounter = 0;
const FULL_HEALTH = 100;

export function clearKilledMonsterCounter() {
  killedMonsterCounter = 0;
}

export default function changeHealthState(who, num) {
  let index;
  if (who === 'player') {
    index = 0;
  } else if (who === 'monster') {
    index = 1;
  }
  const percentHealthBar = document.getElementsByClassName('percent-health-bar')[index];
  const healthBar = document.getElementsByClassName('health-bar')[index];

  let newHealthState = parseInt(percentHealthBar.innerText, 10) + num;
  if (newHealthState > FULL_HEALTH) newHealthState = FULL_HEALTH;
  percentHealthBar.style.width = `${healthBar.clientWidth * newHealthState / FULL_HEALTH}px`;
  percentHealthBar.innerText = `${newHealthState}%`;

  if (newHealthState <= 0) {
    if (who === 'player') {
      const recArr = JSON.parse(localStorage.getItem('RecordsArr'));
      recArr[recArr.length - 1].killedMonsersAmmount = killedMonsterCounter;
      localStorage.setItem('RecordsArr', JSON.stringify(recArr));
      createRecordsTable(recArr);
    } else if (who === 'monster') {
      killedMonsterCounter += 1;
      goToTheNextLevel(killedMonsterCounter + 1);
    }
  }
}
