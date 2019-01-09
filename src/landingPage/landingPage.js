import showRegistrationWindow from '../registration/registration';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';
import { clearElement } from '../modalWindow/modalWindow';

function createLogo(parent) {
  const logo = document.createElement('div');
  logo.innerText = 'Заколдованное Королевство';
  parent.appendChild(logo);
}

function createNav(parent) {
  const navElements = [
    { link: '#game-description', text: 'Описание игры' },
    { link: '#screenshots', text: 'Скриншоты' },
    { link: '#game-creator', text: 'Создатель игры' },
  ];
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  navElements.forEach((obj) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.innerText = obj.text;
    a.href = obj.link;
    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  parent.appendChild(nav);
}

function createGameDescription(parent) {
  const div = document.createElement('div');
  div.id = 'game-description';
  div.classList.add('game-description');
  const text = '<p>Добро пожаловать в Страну Чудес, дорогой друг!</p>'
    + '<p>Наша чудесная страна всегда славилась своими красотами: лесами,'
    + 'полями и горами, реками и озерами. Жители нашей маленькой страны '
    + 'всегда были бодры и веселы, с удовольствием трудились и с не '
    + 'меньшим отдыхали: пели, танцевали и радовались жизни.</p>'
    + '<p>Но однажды преключилась с нами беда - злые монстры захватили наши края.'
    + 'Теперь уже никто не поет и не веселится, города и деревни в запустении, '
    + 'грусть и тоска царит на наших землях.</p>'
    + '<p>Только ты, Юный Рыцарь, сможешь помочь нам - порази своим умом и '
    + 'смекалкой всех монстров и освободи наше Заколдованное '
    + 'Королевство от них. Поспеши, наши силы уже на исходе!</p>';
  div.innerHTML = text;
  parent.appendChild(div);
}

function createPlayButton(parent) {
  const button = document.createElement('button');
  button.classList.add('play-button');
  button.innerHTML = 'Играть!';
  parent.appendChild(button);
  button.addEventListener('click', showRegistrationWindow);
}

function createHeadSection() {
  const section = document.createElement('section');
  section.classList.add('head-section');
  createNav(section);
  createLogo(section);
  createGameDescription(section);
  createPlayButton(section);
  pressEnterHandler(showRegistrationWindow);
  document.body.appendChild(section);
}

function createScreenshotSection() {
  const screenshots = [
    { url: 'images/screenshots/1.PNG', text: '1. Регистрация' },
    { url: 'images/screenshots/2.PNG', text: '2. Начало игры' },
    { url: 'images/screenshots/3.PNG', text: '3. Выбор воздейстия' },
    { url: 'images/screenshots/4.PNG', text: '4. Выбор задания' },
    { url: 'images/screenshots/5.PNG', text: '5. Решениезадания' },
    { url: 'images/screenshots/6.PNG', text: '6. Таблица рекордов' },
  ];
  const section = document.createElement('section');
  section.id = 'screenshots';
  section.classList.add('screenshots-section');
  const ul = document.createElement('ul');

  screenshots.forEach((obj) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = obj.url;
    const div = document.createElement('div');
    div.innerHTML = obj.text;
    li.appendChild(img);
    li.appendChild(div);
    ul.appendChild(li);
  });

  section.appendChild(ul);
  document.body.appendChild(section);
}

function createContactSection() {
  const section = document.createElement('section');
  section.id = 'game-creator';
  section.classList.add('contacts-section');
  const h2 = document.createElement('h2');
  h2.innerHTML = 'Создатель игры: Гущо Анастасия';
  section.appendChild(h2);
  const h3 = document.createElement('h3');
  h3.innerHTML = 'Программист, junior web-developer';
  section.appendChild(h3);

  const contactInfo = [
    { class: 'fa-phone', text: '+375(29) 160-13-34' },
    { class: 'fa-at', text: '375291601334@mail.ru' },
    { class: 'fa-map-marker-alt', text: 'Belarus, Minsk, Jakyba Kolosa lane, 11, flat 7' },
  ];
  contactInfo.forEach((obj) => {
    const i = document.createElement('i');
    i.classList.add('fas');
    i.classList.add(obj.class);
    const p = document.createElement('p');
    p.innerText = `${obj.text}`;
    p.prepend(i);
    section.appendChild(p);
  });

  document.body.appendChild(section);
}

export default function createLandingPage() {
  clearElement(document.body);
  createHeadSection();
  createScreenshotSection();
  createContactSection();
}
