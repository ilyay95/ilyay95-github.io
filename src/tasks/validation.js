function createTooltip(text, parent) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerHTML = text;
  parent.appendChild(tooltip);
}

function removeTooltip() {
  const tooltip = document.getElementsByClassName('tooltip')[0];
  tooltip.remove();
}

export default function isBlank(value) {
  if (value === '') {
    const modalWindow = document.getElementsByClassName('modal-window')[0];
    createTooltip('Вы ничего не ввели', modalWindow);

    const input = document.getElementsByClassName('task-input')[0];
    input.addEventListener('focus', removeTooltip);
    return true;
  }
  return false;
}
