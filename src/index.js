const SECONDARY_CLASS = 'button--secondary';
const HIDE_CLASS = 'hide';
const SHOW_CLASS = 'show';
const target = document.getElementById('mainButton');
const donationSection = Array.from(document.querySelectorAll('#spenden'))[0];
const primarySections = Array.from(document.querySelectorAll('.section--primary, .family'));

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

  const buttonInsideDonationSection = inside(donationSection, target)

  if (buttonInsideDonationSection) {
    target.classList.remove(SHOW_CLASS);
    target.classList.add(HIDE_CLASS);
  } else {
    target.classList.remove(HIDE_CLASS);
    target.classList.add(SHOW_CLASS);
  }

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

const copyToClipboard = document.getElementsByClassName('copy');
Array.from(copyToClipboard).forEach((element) => {
  element.addEventListener('click', () => document.execCommand('copy'));
  element.addEventListener('copy', (event) => {
    event.preventDefault();
    if (event.clipboardData) {
      let text = element.parentElement.textContent;
      if (typeof element.dataset.removeSpaces !== 'undefined') {
        text = text.replace(/\s/g, '');
      }
      event.clipboardData.setData('text/plain', text);
    }
  });
});


(function() {
  const href = window.location.href;
  if (href.endsWith('/en/')) {
    return window.location.assign('/en/index.html')
  }

  if (href.endsWith('/en')) {
    return window.location.assign('/en/index.html')
  }

  const userLang = navigator.language || navigator.userLanguage; 
  if (userLang.startsWith('en') && !href.endsWith('?de') && !href.includes('/en/')) {
    return window.location.assign('/en/index.html')
  }
})();