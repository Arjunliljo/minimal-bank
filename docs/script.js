'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const operationContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__tab');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// learn more button scroll to features
learnMoreBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' })
})

// scrooll according to the link clicked 
navLinks.addEventListener('click', (e) => {

  e.preventDefault();

  const id = e.target.getAttribute('href');

  const target = document.querySelector(id);

  target.scrollIntoView({ behavior: 'smooth' })

})



// header links opacity dim feature implementation
function linksEffect(event) {

  const target = event.target;

  if (!target.classList.contains('nav__link')) return;

  const siblings = target.closest('.nav').querySelectorAll('.nav__link');

  const logo = target.closest('.nav').querySelector('.nav__logo');

  logo.style.opacity = this;

  siblings.forEach(element => {

    if (element === target) return;

    element.style.opacity = this;

  });

}

navLinks.addEventListener('mouseover', linksEffect.bind(0.5));

navLinks.addEventListener('mouseout', linksEffect.bind(1));



// switching contents according to tab clicked
function switchTabs(event) {

  const clicked = event.target.closest('.operations__tab');

  tabs.forEach((tab, i) => {

    if (tab === clicked) {

      clicked.classList.add('operations__tab--active');

      replaceContent(i + 1);

      return;
    }

    if (tab.classList.contains('operations__tab--active')) {

      tab.classList.remove('operations__tab--active')

    }

  })

}

let activeContent = document.querySelector(`.operations__content--1`);

function replaceContent(i) {

  const content = document.querySelector(`.operations__content[data-tab="${i}"]`);

  if (activeContent === content) return;

  activeContent.classList.remove('operations__content--active')

  activeContent = content;

  activeContent.classList.add('operations__content--active')
}

operationContainer.addEventListener('click', switchTabs)


// implementing the slider

const slides = document.querySelectorAll('.slide');

gotToSlide(0);

function gotToSlide(pos) {

  slides.forEach((el, i) => {

    el.style.transform = `translate(${(i - pos) * 100}%)`;

  })

}


let pos = 0;

function rightSlide() {

  pos++;

  if (pos === slides.length) pos = 0;

  gotToSlide(pos);
  activateBtn(pos);

}

function leftSlide() {

  if (pos === 0) pos = slides.length - 1;

  else
    pos--;

  gotToSlide(pos);
  activateBtn(pos);

}

const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');

rightBtn.addEventListener('click', rightSlide);
leftBtn.addEventListener('click', leftSlide);


// Dots
const dotContainer = document.querySelector('.dots');

let activeBtn;

implementBtns();

function implementBtns() {

  slides.forEach((_, i) => {

    const btn = `<button class="dots__dot" data-slide="${i}"></button>`

    dotContainer.insertAdjacentHTML('beforeend', btn);

  })

  activeBtn = document.querySelector(`.dots__dot`);

  activeBtn.classList.add('dots__dot--active');

}

// makeing dots interactive
dotContainer.addEventListener('click', (event) => {

  if (!event.target.classList.contains('dots__dot')) return;

  const { slide } = event.target.dataset;

  gotToSlide(slide);

  if (activeBtn === event.target) return;

  activateBtn(slide)

})

function activateBtn(slide) {

  activeBtn.classList.remove('dots__dot--active');

  activeBtn = document.querySelector(`.dots__dot[data-slide = "${slide}"]`);

  activeBtn.classList.add('dots__dot--active');

}


// navingation sticking
const nav = document.querySelector('.nav');

const header = document.querySelector('.header')

const height = parseFloat(getComputedStyle(nav).height);

function observerNav(event, observer) {

  const [intersection] = event;

  intersection.isIntersecting && nav.classList.remove('sticky');
  intersection.isIntersecting || nav.classList.add('sticky');

}

const options = {
  root: null,
  threshold: 0,
  rootMargin: -height + 'px',

}

const navObserver = new IntersectionObserver(observerNav, options);

navObserver.observe(header);


// creating section effects
const sections = document.querySelectorAll('.section');

function callBack(entries, observer) {

  const [intersect] = entries;

  if (intersect.isIntersecting) {

    intersect.target.classList.remove('section--hidden');

    observer.unobserve(intersect.target);
  }

}

const sectionObserver = new IntersectionObserver(callBack, {

  root: null,
  threshold: 0.2,
})

sections.forEach(el => {
  sectionObserver.observe(el)
  el.classList.add('section--hidden')
})

const images = document.querySelectorAll('.lazy-img');

function imgLoad(entries, observer) {

  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = `${entry.target.getAttribute('data-src')}`;

  entry.target.classList.remove('lazy-img');

  observer.remove(entry.target);
}

const imgObserver = new IntersectionObserver(imgLoad, {

  root: null,
  threshold: 0.2,

});

images.forEach(el => imgObserver.observe(el));