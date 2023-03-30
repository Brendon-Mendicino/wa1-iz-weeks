'use strict';


function buildRating(id, parent, rating = null) {
    for (let i = 5; i >= 1; i--) {
        const inputId = id + i;

        const input = document.createElement('input');
        input.type = "radio";
        input.name = "rating" + id;
        input.value = i;
        input.id = inputId;
        input.checked = rating === i ? true : false;
        parent.appendChild(input);

        const label = document.createElement('label');
        label.htmlFor = inputId;
        label.innerText = "☆";
        parent.appendChild(label);
    }
}

function Film(id, title, isFavourite = false, watchDate = null, rating = null) {
    this.id = id;
    this.title = title;
    this.isFavourite = isFavourite;
    this.watchDate = watchDate;
    this.rating = rating;

    this.watchDateFormatted = () => this.watchDate && this.watchDate.format('MMMM DD, YYYY');
};

const films = [
    new Film(1, 'Pulp Fiction', true, dayjs('2023-03-10'), 5),
    new Film(2, '21 Grams', true, dayjs('2023-03-17'), 4),
    new Film(3, 'Star Wars', false),
    new Film(4, 'Matrix', false),
    new Film(5, 'Shrek', false, dayjs('2023-03-21'), 3)
];


function FilmLibrary() {
    this.films = films;

    this.addNewFilm = (film) => this.films.push(film);

    this.sortByDate = () => [...this.films].sort((a, b) => {
        if (b.watchDate == null) {
            return -1;
        }
        if (a.watchDate == null) {
            return 1;
        }

        return (a.watchDate.isAfter(b.watchDate)) ? 1 : -1;
    });

    this.resetWatchedFilms = () => { this.films = []; };

    this.getRated = () => [...this.films]
        .filter(f => f.rating != null)
        .sort((a, b) => b - a);

    this.getFavorites = () => [...this.films]
        .filter(f => f.isFavourite);

    this.getBestRated = () => [...this.films].filter(f => f.rating === 5);

    this.getLastMonth = () => [...this.films].filter(f => dayjs().diff(f.watchDate, 'month') === 1);

    this.getUnseen = () => [...this.films].filter(f => f.watchDate ? false : true);
};




function displayFilms(films) {
    const ul = document.getElementById('film-list');
    ul.innerHTML = "";

    films.forEach(f => {
        const li = document.createElement('li');
        li.className = "list-group-item";


        const row = document.createElement('div');
        row.className = "row row-cols-4";


        const title = document.createElement('div');
        title.className = "col film-title";
        title.innerText = f.title;
        row.appendChild(title);

        const favorite = document.createElement('div');
        favorite.className = "col text-end";
        favorite.appendChild((() => {
            const input = document.createElement('input')
            input.type = "checkbox";
            input.checked = f.isFavourite;
            return input;
        })());
        favorite.append("Favorite");
        row.appendChild(favorite);

        const watchDate = document.createElement('div');
        watchDate.className = "col text-end";
        watchDate.innerText = f.watchDateFormatted() || "";
        row.appendChild(watchDate);

        const rating = document.createElement('div');
        rating.className = "col rating";
        buildRating(f.title, rating, f.rating);
        row.appendChild(rating);

        li.appendChild(row);
        ul.appendChild(li);

    });
}

function filterEventListener(id) {
    const filterList = [...document.getElementById('filter-list').children];

    filterList.forEach(f => {
        if (f.id === id) {
            f.classList.add("active");
        } else {
            f.classList.remove("active");
        }
    });

    document.getElementById('filter-title').innerText = document.getElementById(id).innerText;
}

function setFilterEvents(library) {
    document.getElementById('filter-all').addEventListener('click', function (event) {
        filterEventListener(this.id);
        displayFilms(library.films);
    });

    document.getElementById('filter-favorites').addEventListener('click', function (event) {
        filterEventListener(this.id);
        displayFilms(library.getFavorites());
    });

    document.getElementById('filter-best-rated').addEventListener('click', function (event) {
        filterEventListener(this.id);
        displayFilms(library.getBestRated());
    });

    document.getElementById('filter-last-month').addEventListener('click', function (event) {
        filterEventListener(this.id);
        displayFilms(library.getLastMonth());
    });

    document.getElementById('filter-unseen').addEventListener('click', function (event) {
        filterEventListener(this.id);
        displayFilms(library.getUnseen());
    });
}



const library = new FilmLibrary();

const filmToDisplay = library.films;

displayFilms(filmToDisplay);

setFilterEvents(library);
