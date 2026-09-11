document.addEventListener("DOMContentLoaded", () => {
  const ticketLink = "https://example.com"; // Replace with your Q-tickets URL.

  document.querySelectorAll('a[href="https://example.com"]').forEach(link => {
    link.href = ticketLink;
  });

  // Countdown to 08 October 2026, 18:00 Krasnoyarsk time (UTC+7).
  const target = new Date("2026-10-08T18:00:00+07:00").getTime();
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    fields.days.textContent = String(days).padStart(2, "0");
    fields.hours.textContent = String(hours).padStart(2, "0");
    fields.minutes.textContent = String(minutes).padStart(2, "0");
    fields.seconds.textContent = String(seconds).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);

  const track = document.getElementById("galleryTrack");
  const cards = [...track.querySelectorAll(".gallery-card")];
  const progress = document.getElementById("galleryProgress");
  let current = 0;

  function updateProgress() {
    progress.style.width = `${((current + 1) / cards.length) * 100}%`;
  }
  function goTo(index) {
    current = (index + cards.length) % cards.length;
    cards[current].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    updateProgress();
  }
  document.getElementById("galleryPrev").addEventListener("click", () => goTo(current - 1));
  document.getElementById("galleryNext").addEventListener("click", () => goTo(current + 1));
  updateProgress();

  // Small pointer glow on desktop.
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
});


/* ========================================
   БЕСКОНЕЧНАЯ БЕГУЩАЯ СТРОКА
======================================== */

const ticker = document.querySelector(".hero-ticker");
const tickerTrack = document.querySelector(".hero-ticker-track");

if (ticker && tickerTrack) {

  // Берём первую группу элементов
  const firstGroup = tickerTrack.querySelector(".hero-ticker-group");

  // Удаляем все группы, кроме первой
  tickerTrack.innerHTML = "";
  tickerTrack.appendChild(firstGroup);

  // Клонируем группу несколько раз
  // чтобы строка всегда заполняла экран
  for (let i = 0; i < 5; i++) {
    const clone = firstGroup.cloneNode(true);

    tickerTrack.appendChild(clone);
  }

  let position = 0;
  let groupWidth = 0;

  // Скорость движения
  const speed = 0.6;


  function updateWidth() {
    groupWidth = firstGroup.offsetWidth;
  }


  function moveTicker() {

    position -= speed;

    // Когда первая группа полностью ушла,
    // возвращаем её в конец незаметно
    if (Math.abs(position) >= groupWidth) {
      position += groupWidth;
    }

    tickerTrack.style.transform =
      `translateX(${position}px)`;

    requestAnimationFrame(moveTicker);
  }


  // Рассчитываем ширину
  updateWidth();

  // Пересчитываем при изменении размера окна
  window.addEventListener("resize", updateWidth);

  // Запускаем движение
  moveTicker();
}