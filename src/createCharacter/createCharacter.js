const NUMBER_OF_MONSTER_SETS = 9;
const SPEED_RATE = 0.5;
const FPS = 1000;

let playerGoingToHit = false;
let monsterGoingToHit = false;
let playerThrowingGun = false;
let addPlayerHealth = false;

let addMonsterBlood = false;
let addPlayerBlood = false;

const player = {
  path: './images/characters/player/',
  parts: ['leftLeg', 'rightLeg', 'body', 'gun', 'leftArm', 'rightArm', 'head'],
  coordX: [+50, +0, -5, 80, 60, -15, -37],
  coordY: [240, 240, 150, 173, 160, 163, 0],
  startX: 400,
  startY: 750,
};

const monster = {
  path: './images/characters/monsters/',
  parts: ['leftLeg', 'rightLeg', 'body', 'gun', 'leftArm', 'rightArm', 'head'],
  coordX: [+50, +0, -5, -130, 60, -15, -37],
  coordY: [240, 240, 150, 173, 160, 163, 0],
  startX: 1400,
  startY: 750,
};

const images = {};
images.player = {};
images.monster = {};
images.background = {};
images.blood = {};
images.light = {};

const sounds = {};

requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

function generateMonsterPart(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCanvasContext() {
  const canvas = document.getElementsByTagName('canvas')[0];
  const context = canvas.getContext('2d');
  canvas.width = canvas.width;
  return context;
}

function loadSounds() {
  sounds.flying = new Audio('./sounds/flying.mp3');
  sounds.hitting = new Audio('./sounds/hitting.mp3');
  sounds.curing = new Audio('./sounds/curing.mp3');
}

function loadImages() {
  // load background
  images.background = new Image();
  images.background.src = './images/background.png';
  // load blood
  images.blood = new Image();
  images.blood.src = './images/characters/blood.png';
  images.blood.startY = 840;
  images.blood.monsterStartX = 1250;
  images.blood.playerStartX = 430;
  // load light
  images.light = new Image();
  images.light.src = './images/characters/light.png';
  images.light.startY = 700;
  images.light.startX = 290;

  // load player parts
  for (let i = 0; i < player.parts.length; i += 1) {
    images.player[player.parts[i]] = new Image();
    images.player[player.parts[i]].src = `${player.path + player.parts[i]}.png`;
  }

  // load monster parts
  for (let i = 0; i < monster.parts.length; i += 1) {
    images.monster[monster.parts[i]] = new Image();
    images.monster[monster.parts[i]].src = `${monster.path + generateMonsterPart(1, NUMBER_OF_MONSTER_SETS)}/${monster.parts[i]}.png`;
  }
}

function makeStepsDecorator() {
  const delta = 0.1;
  let direction = 1;
  let movementsAmt = 0;
  const maxMoveLength = 1;
  return function makeSteps() {
    if (direction === 1) {
      movementsAmt -= delta;
      if (movementsAmt < -maxMoveLength) {
        direction = -1;
      }
    } else {
      movementsAmt += delta;
      if (movementsAmt > maxMoveLength) {
        direction = 1;
      }
    }
    return movementsAmt;
  };
}
const makeSteps = makeStepsDecorator();

export function makeAnimationTrue(animationType) {
  switch (animationType) {
    case 'playerGoingToHit':
      playerGoingToHit = true;
      break;
    case 'monsterGoingToHit':
      monsterGoingToHit = true;
      break;
    case 'playerThrowingGun':
      playerThrowingGun = true;
      sounds.flying.play();
      break;
    case 'addPlayerHealth':
      addPlayerHealth = true;
      sounds.curing.play();
      setTimeout(() => {
        addPlayerHealth = false;
        sounds.curing.pause();
      }, 4000);
      break;
    default:
      break;
  }
}

function goToHitDecorator() {
  let delta = 0.1;
  let direction;
  let x;
  let stepsToHitAmt = 0;
  const bounderRight = monster.startX + monster.coordX[3];
  const bounderLeft = player.startX + player.coordX[3];
  return function goToHit() {
    if (playerGoingToHit) {
      x = player.startX + player.coordX[3];
      if (direction === undefined) {
        direction = 1;
        stepsToHitAmt = 0;
      }
    } else if (monsterGoingToHit) {
      x = monster.startX + monster.coordX[3];
      if (direction === undefined) {
        direction = -1;
        stepsToHitAmt = 0;
      }
    }
    if (direction === 1) {
      stepsToHitAmt += delta;
      if (x > bounderRight) {
        if (playerGoingToHit) {
          delta = 0;
          stepsToHitAmt = 0;
          addMonsterBlood = true;
          sounds.hitting.play();
          setTimeout(() => {
            delta = 0.1;
            addMonsterBlood = false;
            sounds.hitting.pause();
          }, 2000);
          direction = -1;
        } else {
          monsterGoingToHit = false;
          direction = undefined;
        }
      }
    } else {
      stepsToHitAmt -= delta;
      if (x < bounderLeft) {
        if (monsterGoingToHit) {
          delta = 0;
          stepsToHitAmt = 0;
          addPlayerBlood = true;
          sounds.hitting.play();
          setTimeout(() => {
            delta = 0.1;
            addPlayerBlood = false;
            sounds.hitting.pause();
          }, 2000);
          direction = 1;
        } else {
          playerGoingToHit = false;
          direction = undefined;
        }
      }
    }
    return stepsToHitAmt;
  };
}
const goToHit = goToHitDecorator();

function throwGunDecorator() {
  let delta = 0.1;
  let x;
  let flyingGunAmt = 0;
  const bounderRight = monster.startX + monster.coordX[3];
  return function throwGun() {
    x = player.startX + player.coordX[3];
    flyingGunAmt += delta;
    if (x > bounderRight && delta > 0) {
      delta = 0;
      flyingGunAmt = 0;
      addMonsterBlood = true;
      setTimeout(() => {
        delta = 0.1;
        addMonsterBlood = false;
        sounds.curing.pause();
        playerThrowingGun = false;
        player.coordX[3] = 80;
      }, 2000);
    }
    return flyingGunAmt;
  };
}
const throwGun = throwGunDecorator();

function update() {
  const permanentAnimation = makeSteps();
  let stepsToHitAmt = 0;
  let flyingGunAmt = 0;
  if (playerGoingToHit || monsterGoingToHit) stepsToHitAmt = goToHit();
  if (playerThrowingGun) flyingGunAmt = throwGun();

  for (let i = 0; i < player.parts.length; i += 1) {
    const partName = player.parts[i];
    if (partName === 'rightLeg') {
      player.coordY[i] -= permanentAnimation;
    } else if (partName === 'leftLeg') {
      player.coordY[i] += permanentAnimation;
    } else if (partName === 'leftArm' || partName === 'rightArm') {
      player.coordY[i] -= permanentAnimation * SPEED_RATE;
    } else if (partName === 'gun') {
      if (playerThrowingGun) {
        player.coordX[i] += flyingGunAmt;
      } else { player.coordY[i] -= permanentAnimation * SPEED_RATE; }
    }
    if (playerGoingToHit) player.coordX[i] += stepsToHitAmt;
  }

  for (let i = 0; i < monster.parts.length; i += 1) {
    const partName = monster.parts[i];
    if (partName === 'rightLeg') {
      monster.coordY[i] -= permanentAnimation;
    } else if (partName === 'leftLeg') {
      monster.coordY[i] += permanentAnimation;
    } else if (partName === 'leftArm' || partName === 'rightArm' || partName === 'gun') {
      monster.coordY[i] -= permanentAnimation * SPEED_RATE;
    }
    if (monsterGoingToHit) monster.coordX[i] += stepsToHitAmt;
  }
}

function render() {
  const context = getCanvasContext();
  context.drawImage(images.background, 0, 0);
  // player render
  if (addPlayerHealth) context.drawImage(images.light, images.light.startX, images.light.startY);
  for (let i = 0; i < player.parts.length; i += 1) {
    const partImg = images.player[player.parts[i]];
    const x = player.startX + player.coordX[i];
    const y = player.startY + player.coordY[i];
    context.drawImage(partImg, x, y);
  }
  // monster render
  for (let i = 0; i < monster.parts.length; i += 1) {
    const partImg = images.monster[monster.parts[i]];
    const x = monster.startX + monster.coordX[i];
    const y = monster.startY + monster.coordY[i];
    context.drawImage(partImg, x, y);
  }
  // battle render
  if (addMonsterBlood) context.drawImage(images.blood, images.blood.monsterStartX, images.blood.startY);
  if (addPlayerBlood) context.drawImage(images.blood, images.blood.playerStartX, images.blood.startY);
}

let then = Date.now();
function main() {
  const now = Date.now();
  const delta = now - then;
  update(delta / FPS);
  render();
  then = now;
  requestAnimationFrame(main);
}

export default function createCharacters() {
  monsterGoingToHit = false;
  loadSounds();
  loadImages();
  main();
}
