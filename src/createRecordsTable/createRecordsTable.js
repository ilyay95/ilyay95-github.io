import createLandingPage from '../landingPage/landingPage';
import  { clearKilledMonsterCounter } from '../charactersHealth/changeHealthState';
import { clearElement } from '../modalWindow/modalWindow';
import { pressEnterHandler } from '../playWithKeyboard/keyPressHandlers';

function createTableTitle(parent, text) {
  const title = document.createElement('h2');
  title.classList.add('records-table-title');
  title.innerText = text;
  parent.appendChild(title);
}

function createHeadRow(table) {
  const columnNames = ['Имя игрока', 'Кол-во побежденных монстров'];
  const headRow = document.createElement('tr');
  for (let i = 0; i < columnNames.length; i += 1) {
    const th = document.createElement('th');
    th.innerText = columnNames[i];
    headRow.appendChild(th);
  }
  table.appendChild(headRow);
}

function fillTable(table, info) {
  for (let i = 0; i < info.length; i += 1) {
    const row = document.createElement('tr');
    for (const key in info[i]) {
      const td = document.createElement('td');
      td.innerText = info[i][key];
      row.appendChild(td);
    }
    table.appendChild(row);
  }
}

function createTable(parent, info) {
  const table = document.createElement('table');
  createHeadRow(table);
  fillTable(table, info);
  parent.appendChild(table);
}

function createButton(parent) {
  const button = document.createElement('button');
  button.classList.add('play-button');
  button.innerHTML = 'Вернуться к игре';
  parent.appendChild(button);
  button.addEventListener('click', createLandingPage);
  pressEnterHandler(createLandingPage);
}

export default function createRecordsTable(recordsInfo) {
  clearElement(document.body);
  const container = document.createElement('div');
  container.classList.add('records-container');
  document.body.appendChild(container);

  createTableTitle(container, 'Таблица рекордов');
  createTable(container, recordsInfo);
  createButton(container);
  clearKilledMonsterCounter();
}
