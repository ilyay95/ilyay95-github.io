export default function createHealthBar(parent, name) {
  const container = document.createElement('div');
  container.classList.add('health-bar-container');

  const characterName = document.createElement('h3');
  characterName.classList.add('character-name');
  characterName.innerText = name;
  container.appendChild(characterName);

  const healthBar = document.createElement('div');
  healthBar.classList.add('health-bar');

  const percentHealthBar = document.createElement('div');
  percentHealthBar.classList.add('percent-health-bar');
  percentHealthBar.width = healthBar.width;
  percentHealthBar.innerText = '100%';
  healthBar.appendChild(percentHealthBar);

  container.appendChild(healthBar);
  parent.appendChild(container);
}
