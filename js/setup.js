'use strict';
(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var userDialog = document.querySelector('.setup');
  // userDialog.classList.remove('hidden');

  var similarListElement = userDialog.querySelector('.setup-similar-list');
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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Отрисовка волшебников на странице
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
