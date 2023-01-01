(function () {
  const hash = window.location.hash;

  if (!hash) {
    return;
  }

  const element = document.querySelector(hash);
  if (!element) {
    return;
  }

  element.classList.add("selected");
  console.log(element);
})();
