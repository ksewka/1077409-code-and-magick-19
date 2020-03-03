'use strict';
(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_AMOUNT = 4;
  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var form = userDialog.querySelector('.setup-wizard-form');


  // Функция для подбора случайного имени волшебника
  var getRandomName = function (arr1, arr2) {
    var randomWizardName = Math.floor(Math.random() * arr1.length);
    var randomWizardLastName = Math.floor(Math.random() * arr2.length);
    var randomName = arr1[randomWizardName] + ' ' + arr2[randomWizardLastName];
    return randomName;
  };

  // Генерируем случайные данные для волшебников
  var wizards = [];
  for (var j = 0; j < 4; j++) {
    var wizardsData = {
      name: getRandomName(WIZARD_NAMES, WIZARD_LAST_NAMES),
      coatColor: window.colorize.randomColor(window.colorize.COAT_COLOR),
      eyesColor: window.colorize.randomColor(window.colorize.EYES_COLOR),
    };
    wizards.push(wizardsData);
  }

  // Функция создает клоны волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Обработчик при успешной загрузке
  var successHandler = function (someWizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_AMOUNT; i++) {
      fragment.appendChild(renderWizard(someWizards[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Обработчик при появлении ошибки
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('submit', function (evt) {
    var submitButton = userDialog.querySelector('.setup-submit');
    submitButton.textContent = 'Данные отправляются ...';
    submitButton.disabled = true;
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
    evt.preventDefault();
  });

  window.backend.load(successHandler, errorHandler);
})();
