// Записываем сюда все элементы, с которыми работаем
const formSearch = document.querySelector(".form-search"),
  inputCitiesFrom = document.querySelector(".input__cities-from"),
  dropdownCitiesFrom = document.querySelector(".dropdown__cities-from"),
  inputCitiesTo = document.querySelector(".input__cities-to"),
  dropdownCitiesTo = document.querySelector(".dropdown__cities-to"),
  inputDateDepart = document.querySelector("input__date-depart");
// Список городов и данные
let city = [];
const citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
  proxy = 'https://cors-anywhere.herokuapp.com/',
  API_KEY = '2b6e5addd47843d5a38619e8982bc0ed',
  calendar = 'http://min-prices.aviasales.ru/calendar_preload';
// Функция для получения данных с сайта
const getData = (url, callback) => {

  const request = new XMLHttpRequest();
  request.open('GET', url); //получаем данные 
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;
    if (request.status === 200) {
      callback(request.response); //проверяем, что получили все успешно
    } else {
      console.error(request.status); //выводим ошибку, если нет
    }
  });

  request.send();

};

// Функция, чтобы при клике на форму выводится список городов
// Все сортируется в соответствии с буквами
const showCity = (input, list) => {
  list.textContent = "";
  if (input.value !== "") {
    const filterCity = city.filter(item => { //фильтруем сразу весь массив, лучше делать это тут, но внизу есть такой же фильтр
      if (item.name) {
        const fixItem = item.name.toLowerCase();
        return fixItem.includes(input.value.toLowerCase());
      }
    });
    filterCity.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("dropdown__city");
      li.textContent = item.name;
      list.append(li);
    });
  }
};
const selectCity = (event, input, list) => { 
  const target = event.target;
  if (target.tagName.toUpperCase() === "LI") {
    input.value = target.textContent;
    list.textContent = "";
  }
};
inputCitiesTo.addEventListener("input", () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});
// Вывод в поле откуда
inputCitiesFrom.addEventListener("input", () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});
// Выбор в поле куда
// Вывод в форме города, который мы выбрали
dropdownCitiesFrom.addEventListener("click", (event) => {
  selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});
dropdownCitiesTo.addEventListener("click", (event) => {
  selectCity(event, inputCitiesTo, dropdownCitiesTo);
});
getData(proxy + citiesAPI, (data) => {
  city = JSON.parse(data).filter(item => item.name);
});