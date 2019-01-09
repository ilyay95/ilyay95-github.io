function showCover() {
  const cover = document.createElement('div');
  cover.classList.add('modal-window-cover-div');
  document.body.appendChild(cover);
}

export function closeModalWindow() {
  document.getElementsByClassName('modal-window')[0].remove();
  document.getElementsByClassName('modal-window-cover-div')[0].remove();
}

export function clearElement(elem) {
  let element = elem.firstChild;
  while (element) {
    elem.removeChild(element);
    element = elem.firstChild;
  }
}

function createCloseButton(parent) {
  const closeButton = document.createElement('span');
  closeButton.classList.add('close');
  parent.appendChild(closeButton);
  closeButton.addEventListener('click', closeModalWindow, false);
}

export function createModalWindow() {
  showCover();
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  document.body.appendChild(modalWindow);
  createCloseButton(modalWindow);
}
