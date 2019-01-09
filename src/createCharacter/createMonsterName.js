const adjective = ['Ужасный', 'Злобный',  'Грозный', 'Угрюмый', 'Мрачный'];
const race = ['Огр',  'Великан', 'Человек'];
const name = [ 'Дима', 'Витя','Вася'];

function returnRandomElem(arr) {
  const min = 0;
  const max = arr.length - 1;
  return arr[Math.floor(Math.random() * (max - min + 1)) + min];
}

export default function createMonsterName() {
  return `${returnRandomElem(adjective)} ${returnRandomElem(race)} ${returnRandomElem(name)}`;
}
