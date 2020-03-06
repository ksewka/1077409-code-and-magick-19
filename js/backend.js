'use strict';

(function () {
  var urlPost = 'https://js.dump.academy/code-and-magick';
  var urlGet = 'https://js.dump.academy/code-and-magick/data';
  var TIMEOUT_IN_MS = 10000;

  var makeRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }

    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('GET', urlGet);
    request.send();
  };

  var save = function (data, onLoad, onError) {
    var request = makeRequest(onLoad, onError);
    request.open('POST', urlPost);
    request.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };

})();
