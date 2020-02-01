'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_WIDTH = 40;
var GIST_HEIGHT = 150;
var SPACE_BETWEEN = 50;
var GAP_X = (CLOUD_WIDTH - (4 * BAR_WIDTH + 3 * SPACE_BETWEEN)) / 2;
var GAP_Y = (CLOUD_HEIGHT - GIST_HEIGHT) / 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция для получения случайного целого числа в заданном интервале
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функия возвращает случайный оттенок синего
function randomColor(colorNumber) {
  var randomSaturate = getRandomInt(0, 100);
  return 'hsl(' + colorNumber + ' , ' + randomSaturate + '%, 50%)';
}

// Функция для поиска максимального значения в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono ';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 4, CLOUD_Y * 4);
  ctx.fillText('Список результатов: ', CLOUD_X + GAP * 4, CLOUD_Y * 4 + GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP_X + (SPACE_BETWEEN + BAR_WIDTH) * i, (CLOUD_Y + CLOUD_HEIGHT) - GAP_Y / 2 + GAP * 2);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP_X + (SPACE_BETWEEN + BAR_WIDTH) * i, (CLOUD_HEIGHT - GAP_Y + GAP * 2) - (GIST_HEIGHT * times[i]) / maxTime);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = randomColor(240);
    }

    ctx.fillRect((CLOUD_X + GAP_X) + (SPACE_BETWEEN + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP_Y + GAP * 3, BAR_WIDTH, -(GIST_HEIGHT * times[i]) / maxTime);

  }

};
