// static/js/simple-cookie-banner.js
(function () {
  'use strict';

  // Имя cookie для отслеживания согласия
  var COOKIE_NAME = 'simple_cookie_consent_given';
  var BANNER_ID = 'simple-cookie-banner';

  // Функция для установки cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
  }

  // Функция для получения cookie
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  // Функция для скрытия баннера
  function hideBanner() {
    var banner = document.getElementById(BANNER_ID);
    if (banner) {
      banner.classList.remove('show');
      // Удаляем элемент из DOM после анимации
      setTimeout(function() {
        if (banner && banner.parentNode) {
          banner.parentNode.removeChild(banner);
        }
      }, 300); // Должно совпадать с длительностью transition
    }
  }

  // Функция для принятия cookies
  function acceptCookies() {
    setCookie(COOKIE_NAME, 'true', 365); // Устанавливаем cookie на 1 год
    hideBanner();
    // Здесь можно добавить логику для загрузки других скриптов, если нужно
  }

  // Проверяем, было ли дано согласие
  if (!getCookie(COOKIE_NAME)) {
    // Если согласия нет, создаем и показываем баннер
    var bannerHTML = `
      <div id="${BANNER_ID}">
        <div>
          Questo sito utilizza i cookie per migliorare la tua esperienza di navigazione. 
          <a href="/privacy-policy" target="_blank">Maggiori informazioni</a>
        </div>
        <button id="simple-cookie-accept-btn">Accetta</button>
      </div>
    `;

    // Вставляем баннер в конец body
    var body = document.body;
    if (body) {
      body.insertAdjacentHTML('beforeend', bannerHTML);

      // Добавляем обработчик события после вставки
      var acceptButton = document.getElementById('simple-cookie-accept-btn');
      if (acceptButton) {
        acceptButton.addEventListener('click', acceptCookies);
      }

      // Показываем баннер с небольшой задержкой для корректной анимации
      setTimeout(function() {
        var banner = document.getElementById(BANNER_ID);
        if (banner) {
          banner.classList.add('show');
        }
      }, 10);
    }
  }
})();