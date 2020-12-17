const container = document.querySelector('.container');
const contRect = container.getBoundingClientRect();
const cursor = document.querySelector('.cursor');

container.addEventListener('mousemove', e => {
  const cursRect = cursor.getBoundingClientRect();
  const cursX = e.clientX - contRect.left - cursRect.width / 2;
  const cursY = e.clientY - contRect.top - cursRect.height / 2;
  cursor.style.top = `${cursY}px`;
  cursor.style.left = `${cursX}px`;
});