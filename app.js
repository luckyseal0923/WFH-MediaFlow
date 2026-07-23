const serviceInputs = [...document.querySelectorAll(".services input")];
const specsSection = document.querySelector("#specs");
const notesStep = document.querySelector("#step");
const requestForm = document.querySelector("#form");
const completeSection = document.querySelector("#done");
const warning = document.querySelector("#warning");

const servicesRequiringOutputSpecs = ["平面設計", "照片修圖", "圖文排版"];

function refreshServiceOptions() {
  const hasSelectedService = serviceInputs.some((input) => input.checked);
  const showOutputSpecs = serviceInputs.some(
    (input) => input.checked && servicesRequiringOutputSpecs.includes(input.value),
  );

  specsSection.hidden = !showOutputSpecs;
  notesStep.textContent = showOutputSpecs ? "04" : "03";

  serviceInputs.forEach((input) => {
    input.parentElement.classList.toggle("selected", input.checked);
  });

  return hasSelectedService;
}

serviceInputs.forEach((input) => {
  input.addEventListener("change", refreshServiceOptions);
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!refreshServiceOptions()) {
    warning.hidden = false;
    return;
  }

  warning.hidden = true;
  requestForm.hidden = true;
  completeSection.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#again").addEventListener("click", () => {
  requestForm.reset();
  completeSection.hidden = true;
  requestForm.hidden = false;
  refreshServiceOptions();
});

refreshServiceOptions();
