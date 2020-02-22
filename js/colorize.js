'use strict';
(function () {
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var fireboll = document.querySelector('.setup-fireball-wrap');
  var setup = document.querySelector('.setup');
  var firebollColorInput = setup.querySelector('input[name = "fireball-color"]');
  var coatColorInput = setup.querySelector('input[name = "coat-color"]');
  var eyesColorInput = setup.querySelector('input[name = "eyes-color"]');
  var FIREBOLL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  // Функция для подбора случайного цвета
  var getRandomColor = function (arr) {
    var randomColor = Math.floor(Math.random() * arr.length);
    return arr[randomColor];
  };

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

  window.colorize = {
    randomColor: getRandomColor,
    EYES_COLOR: EYES_COLOR,
    COAT_COLOR: COAT_COLOR
  };
})();

