//  MENU

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const imageURL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'aa0c264839070dfc8bb3dd7ce5bc0da5';
const SERVER = 'https://api.themoviedb.org/3';
const tvShows = document.querySelector('.tv-shows');
const loading = document.createElement('div');
const div = document.querySelectorAll('div');
const tvCardImg = document.querySelector('.tv-card__img');
const tvCardTitle = document.querySelector('.modal__title');
const tvCardDescr = document.querySelector('.description');
const tvGenres = document.querySelector('.genres-list');
const tvRating = document.querySelector('.rating');
const tvCardLink = document.querySelector('.modal__link');
const searchForm = document.querySelector('.search__form');
const searchFormInput = document.querySelector('.search__form-input');
const preloader = document.querySelector('.preloader');
const dropdown = document.querySelector('.dropdown');
const tvShowsHead = document.querySelector('.tv-shows__head');
const posterWrapper = document.querySelector('.poster__wrapper');
const modalContent = document.querySelector('.modal__content')

loading.classList.add('loading');

class DBService {
    getData = async(url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Did not recover data from ${url}`)
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }

    getTestCard = () => {
        return this.getData('card.json');
    }

    getSearchResult = (query) => {
        return this.getData(`${SERVER}/search/tv?api_key=${API_KEY}&query=${query}&language=ru-RU`);
    }

    getTvShow = id => {
        return this.getData(`${SERVER}/tv/${id}?api_key=${API_KEY}&language=ru-RU`);
    }

    getTopRated = () => {
        return this.getData(`${SERVER}/tv/top_rated?api_key=${API_KEY}&language=ru-RU`);
    }

    getPopular = () => {
        return this.getData(`${SERVER}/tv/popular?api_key=${API_KEY}&language=ru-RU`);
    }

    getToday = () => {
        return this.getData(`${SERVER}/tv/airing_today?api_key=${API_KEY}&language=ru-RU`);
    }

    getWeek = () => {
        return this.getData(`${SERVER}/tv/on_the_air?api_key=${API_KEY}&language=ru-RU`);
    }

}

const dbservice = new DBService();

const renderCard = (response, target) => {
    tvShowsList.textContent = '';
    if (!response.total_results) {
        loading.remove();
        tvShowsHead.textContent = 'К сожалению по вашему запросу ничего не найдено....';
        tvShowsHead.style.color = 'red';
        return;
    }
    tvShowsHead.textContent = target ? target.textContent : 'Результат поиска';
    tvShowsHead.style.color = 'green';
    response.results.forEach(item => {
        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote,
            id
        } = item;
        const posterIMG = poster ? imageURL + poster : "../img/no-poster.jpg";
        const backdropIMG = backdrop ? imageURL + backdrop : '';
        const voteElem = vote ? `<span class = "tv-card__vote">${vote}</span>` : '';

        const card = document.createElement('li');
        card.idTV = id;
        card.classList.add('tv-show__item');
        card.innerHTML = `
                    <a href="#" id = "${id}" class="tv-card">
                       ${voteElem}
                        <img class="tv-card__img"
                             src="${posterIMG}"
                             data-backdrop="${backdropIMG}"
                             alt="${title}">
                        <h4 class="tv-card__head">${title}</h4>
                    </a>
                    `;
        loading.remove();
        tvShowsList.append(card);
    });
};

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = searchFormInput.value.trim();
    if (value) {
        tvShows.append(loading);
        dbservice.getSearchResult(value).then(renderCard);
    }
    searchFormInput.value = '';
});

// Open/Close Menu
const closeDropDown = () => {
    dropdown.forEach(item => {
        item.classList.remove('active');
    })
}

hamburger.addEventListener('click', () => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
    closeDropDown();
});

document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
        closeDropDown();
    }
});

leftMenu.addEventListener('click', () => {
    event.preventDefault();
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }

    if (target.closest('#top-rated')) {
        dbservice.getTopRated().then((response) => renderCard(response, target));
    }
    if (target.closest('#popular')) {
        dbservice.getPopular().then((response) => renderCard(response, target));
    }
    if (target.closest('#week')) {
        dbservice.getWeek().then((response) => renderCard(response, target));
    }
    if (target.closest('#today')) {
        dbservice.getToday().then((response) => renderCard(response, target));
    }

    if (target.closest('#search')) {
        tvShowsList.textContent = '';
        tvShowsHead.textContent = '';
    }
});

// Open modal window
tvShowsList.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    const card = target.closest('.tv-card');
    if (card) {
        preloader.style.display = 'block';
        dbservice.getTvShow(card.id)
            .then(response => {
                if (response.poster_path) {
                    tvCardImg.src = imageURL + response.poster_path;
                    posterWrapper.style.display = '';
                    modalContent.style.paddingLeft = '';
                } else {
                    posterWrapper.style.display = 'none';
                    modalContent.style.paddingLeft = '25px';
                }
                tvCardTitle.textContent = response.name;
                tvCardDescr.textContent = response.overview;
                tvGenres.textContent = '';
                for (const item of response.genres) {
                    tvGenres.innerHTML += `<li>${item.name}</li>`;
                }
                tvRating.textContent = response.vote_average;
                tvCardLink.href = response.homepage;
            })
            .then(() => {
                document.body.style.overflow = 'hidden';
                modal.classList.remove('hide');
            })
            .finally(() => {
                preloader.style.display = '';
            });
    }
});


// Close Modal

modal.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('.cross') ||
        target.classList.contains('modal')) {
        document.body.style.overflow = "";
        modal.classList.add('hide');
    }
});

// Card changing cover

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');
    if (card) {
        const img = card.querySelector('.tv-card__img');
        const drop = img.dataset.backdrop;
        if (drop) {
            img.dataset.backdrop = img.src;
            img.src = drop;
        }
    }

};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


let deviceMover = document.getElementById("1.0");
document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            console.log('Left key pressed');;

            break;
        case 38:
            alert('Up key pressed');
            break;
        case 39:
            let row = Math.round(Number(deviceMover.id));
            let column = Number(deviceMover.id) * 10 - row * 10;
            // let moveRight = () => {
            //     let rightArrow = document.getElementById()
            // }
            console.log(row + "," + column);
            break;
        case 40:
            alert('Down key pressed');
            break;
    }
};