const SECONDARY_CLASS = 'button--secondary';
const target = document.getElementById('mainButton');
const primarySections = Array.from(document.querySelectorAll('.section--primary, #spenden'));
function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function inside(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  return (
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top &&
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left
  );
}

function callback() {
  const changeClass = primarySections.reduce((previousValue, element) => {
    return previousValue || inside(element, target);
  }, false);
  if (changeClass) {
    target.classList.add(SECONDARY_CLASS);
  } else {
    target.classList.remove(SECONDARY_CLASS);
  }
}

target.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('spenden').scrollIntoView({
    behavior: 'smooth',
  });
});

window.addEventListener('scroll', throttle(callback, 100));
