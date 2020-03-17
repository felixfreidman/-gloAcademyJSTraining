const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = document.querySelector(".input__cities-from"),
  dropdownCitiesFrom = document.querySelector(".dropdown__cities-from"),
  inputCitiesTo = document.querySelector(".input__cities-to"),
  dropdownCitiesTo = document.querySelector(".dropdown__cities-to"),
  inputDateDepart = document.querySelector("input__date-depart");
const city = [
  "Moscow",
  "Saint-Petersburg",
  "Minsk",
  "Irkutsk",
  "Vladivostok",
  "Samara",
  "Ekaterinburg",
  "Odessa",
  "Nizniy Novgorod",
  "New York",
  "Rostov-na-Donu"
];
const showCity = (input, list) => {
  list.textContent = "";
  if (input.value !== "") {
    const filterCity = city.filter(item => {
      const fixItem = item.toLowerCase();
      return fixItem.includes(input.value.toLowerCase());
    });
    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item;
      list.append(li);
    });
  }
};

inputCitiesFrom.addEventListener("input", () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});
inputCitiesTo.addEventListener("input", () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});
dropdownCitiesFrom.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName.toUpperCase() === "LI") {
    inputCitiesFrom.value = target.textContent;
    dropdownCitiesFrom.textContent = "";
  }
});
dropdownCitiesTo.addEventListener("click", event => {
  const target = event.target;
  if (target.tagName.toUpperCase() === "LI") {
    inputCitiesTo.value = target.textContent;
    dropdownCitiesTo.textContent = "";
  }
});
