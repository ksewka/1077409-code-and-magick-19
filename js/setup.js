'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var FIREBOLL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
//userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var setup = document.querySelector('.setup');
var coatColorInput = setup.querySelector('input[name = "coat-color"]');
var eyesColorInput = setup.querySelector('input[name = "eyes-color"]');
var fireboll = document.querySelector('.setup-fireball-wrap');
var firebollColorInput = setup.querySelector('input[name = "fireball-color"]');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var userNameInput = document.querySelector('.setup-user-name');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// Функция для подбора случайного имени волшебника
var getRandomName = function (arr1, arr2) {
  var randomWizardName = Math.floor(Math.random() * arr1.length);
  var randomWizardLastName = Math.floor(Math.random() * arr2.length);
  var randomName = arr1[randomWizardName] + ' ' + arr2[randomWizardLastName];
  return randomName;
};

// Функция для подбора случайного цвета
var getRandomColor = function (arr) {
  var randomColor = Math.floor(Math.random() * arr.length);
  return arr[randomColor];
};

var wizards = [];
for (var j = 0; j < 4; j++) {
  var wizardsData = {
    name: getRandomName(WIZARD_NAMES, WIZARD_LAST_NAMES),
    coatColor: getRandomColor(COAT_COLOR),
    eyesColor: getRandomColor(EYES_COLOR)
  };
  wizards.push(wizardsData);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (userNameInput === document.activeElement) {
    return evt;
  } else {
    if (evt.key === ESC_KEY) {
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Открытие попапа через клики и клавиатуру
setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// Закрытие попапа через клики и клавиатуру
setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

// Изменение цвета плаща по клику
wizardCoat.addEventListener('click', function () {
  coatColorInput.value = getRandomColor(COAT_COLOR);
  wizardCoat.style.fill = coatColorInput.value;
});


// Изменение цвета глаз по клику
wizardEyes.addEventListener('click', function () {
  eyesColorInput.value = getRandomColor(EYES_COLOR);
  wizardEyes.style.fill = eyesColorInput.value;
});

// Изменение цвета файрбола по клику
fireboll.addEventListener('click', function () {
  firebollColorInput.value = getRandomColor(FIREBOLL_COLOR);
  fireboll.style.backgroundColor = firebollColorInput.value;
});
