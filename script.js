function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
      change.target.style.animationPlayState = "running";
    } else {
      change.target.classList.remove("element-show");
    }
  });
}

let options = {
  threshold: [0],
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");

for (let elm of elements) {
  observer.observe(elm);
}

const track = document.querySelector("#image-track");

// Используем переменную для отслеживания состояния нажатия мыши или касания
let isMouseDown = false;

const handleOnDown = (e) => {
  isMouseDown = true;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  track.dataset.mouseDownAt = clientX;
};

const handleOnUp = () => {
  isMouseDown = false;
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (!isMouseDown) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

// Обновляем обработчики событий для корректной работы с событиями касания
window.addEventListener("mousedown", handleOnDown);
window.addEventListener("touchstart", handleOnDown);

window.addEventListener("mouseup", handleOnUp);
window.addEventListener("touchend", handleOnUp);

window.addEventListener("mousemove", handleOnMove);
window.addEventListener("touchmove", handleOnMove);

document.addEventListener("DOMContentLoaded", function () {
  var header = document.getElementById("myHeader");
  var page = document.getElementById("page");
  var openMenuButton = document.getElementById("openmenu");

  window.addEventListener("scroll", function () {
    page.classList.remove("menuopen");
    if (window.scrollY >= 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  openMenuButton.addEventListener("click", function () {
    header.classList.toggle("sticky");
  });

  var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Prevent the default action
      event.preventDefault();

      // Get the target element
      var targetId = this.getAttribute("href");
      var targetElement = document.querySelector(targetId);

      // Smooth scroll to target
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

const closeModal = (cls) => {
  const modal = document.querySelector(cls);
  modal.classList.remove("activeModal");
};

const openModal = (cls) => {
  const section = document.querySelector(cls);
  section.classList.add("activeModal");
};

let num = 0;
const next = () => {
  if (num >= images.length) {
    num = 0;
  }
  document.querySelector(".afisha").src = images[num];
  num = num + 1;
};

const prev = () => {
  if (num <= 0) {
    num = images.length - 1;
  }
  document.querySelector(".afisha").src = images[num];
  num = num - 1;
};

let coefficient = 0;

const goRight = () => {
  if (coefficient === 1) coefficient = 0;
  coefficient = coefficient + 1;

  document.querySelector(".IC").style.transform = `translate(${
    coefficient * -100
  }%)`;
  console.log(coefficient);
};

const goLeft = () => {
  if (coefficient <= 0) return;
  coefficient = coefficient - 1;

  document.querySelector(".IC").style.transform = `translate(${
    coefficient * 100
  }%)`;
};

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function openForm() {
  console.log("ok");
  const form = document.querySelector(".pop-up");
  form.classList.add("active");
}

function closeForm() {
  const form = document.querySelector(".pop-up");
  form.classList.remove("active");
}

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const isElementsOnScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight;

    if (isElementsOnScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

function check(e) {
  console.log("ok");
  const number = document.querySelector("#input").value;
  console.log(number.length);
  if (!number) return document.querySelector(".fail").classList.add("active");
  if (number.length != 11)
    return document.querySelector(".fail").classList.add("active");
  else document.querySelector(".success").classList.add("active");
}

function closeSuccess() {
  document.querySelector(".success").classList.remove("active");
}

function closeFail() {
  document.querySelector(".fail").classList.remove("active");
}
