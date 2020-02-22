'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var userNameInput = document.querySelector('.setup-user-name');
  var isEscEvent = function (evt, action) {
    if ((userNameInput !== document.activeElement) && (evt.key === ESC_KEY)) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  window.util = {
    ESC_KEY: 'ESC_KEY',
    ENTER_KEY: 'ENTER_KEY',
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
