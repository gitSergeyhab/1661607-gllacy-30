// main-slider

const bodyImage = document.querySelector('.page-body__index');
const dots = document.querySelectorAll('.dots__item');
const slideHeader = document.querySelector('.main-slider__header')

const sledeClasses = [
  'page-body__index--1',
  'page-body__index--2',
  'page-body__index--3',
]

const slideNames = [
  'Крем-брюле и пломбир с малиновым джемом',
  'Шоколадный пломбир и лимонный сорбет',
  'Пломбир с помадкой и клубничный щербет'
]

function removeClass(list, needClass) {
  list.forEach(item => item.classList.remove(needClass))
}

function removeClasses(elem, needClasses) {
  needClasses.forEach(item => elem.classList.remove(item))
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    removeClass(dots, 'dots__item--active');
    dot.classList.add('dots__item--active');
    slideHeader.textContent = slideNames[i];
    removeClasses(bodyImage, sledeClasses);
    bodyImage.classList.add(sledeClasses[i]);
  });
});


// modal
// open-close

const buttonMap = document.querySelector('.standart-button--map');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = modalWrapper.querySelector('.modal');
const closeBtn = modalWrapper.querySelector('.modal-close');

const scrollWidth = getScrollWidth();

buttonMap.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalWrapper.style.display = 'flex';
  modal.classList.add('open-animation');
  setTimeout(() => modal.classList.remove('open-animation'), 500);
  document.body.style.overflow = 'hidden';
  document.body.style.marginRight = scrollWidth + 'px';

  storageWrite('letterName', letterName);
  storageWrite('letterEmail', letterEmail);

  if (!letterName.value) {
    letterName.focus();
  } else if (!letterEmail.value) {
    letterEmail.focus();
  } else {
    letterText.focus();
  }
})

closeBtn.addEventListener('click', closeModal);

window.addEventListener('keydown', (evt) => {
  if (modalWrapper.style.display == 'flex' && evt.keyCode == 27) {
    closeModal();
  }
})


function closeModal() {
  modalWrapper.style.display = 'none';
  document.body.style.overflow = '';
  document.body.style.marginRight = 0;
}

function getScrollWidth() {
  const div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}


// send

const letterName = document.querySelector('#letter-name');
const letterEmail = document.querySelector('#letter-email');
const letterText = document.querySelector('#letter-text');

const sendBtn = document.querySelector('.standart-button--modal');
const modalForm = document.querySelector('.modal-form');
modalForm.addEventListener('submit', (evt) => {


  if (!letterName.value || !letterEmail.value || !letterText.value) {
    evt.preventDefault();
    modal.classList.add('error-animation');
    setTimeout(() => modal.classList.remove('error-animation'), 300);
    sendBtn.textContent = 'Заполните все поля!';
    setTimeout(() => sendBtn.textContent = 'Отправить', 1500)
  }

  localStorage.setItem('letterName', letterName.value);
  localStorage.setItem('letterEmail', letterEmail.value);
});


function storageWrite(storageKey, fieldName) {
  if (localStorage.getItem(storageKey)) {
    fieldName.value = localStorage.getItem(storageKey);
  }
}
