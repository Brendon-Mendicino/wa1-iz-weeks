'use strict';


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * returns a svg with an associated id
 */
function svgDeleteFilm(id, deleteCallback) {
    const svg = htmlToElement('<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>');
    svg.addEventListener('click', event => {
        deleteCallback(id);
    });
    return svg;
}

function removeChildWithId(id, parent) {
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].id === id) {
            parent.children[i].remove();
            break;
        }
    }
}

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

    this.deleteFilm = (title) => {
        this.films = this.films.filter(f => f.title !== title);
        this.listeners.forEach(l => l(title));
    }

    this.listeners = [];
    this.addEventListener = (listener) => {
        this.listeners.add(listener);
    }
};




function displayFilms(films) {
    const ul = document.getElementById('film-list');
    ul.innerHTML = "";

    films.forEach(f => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.id = f.title;


        const row = document.createElement('div');
        row.className = "row row-cols-4";


        const title = document.createElement('div');
        title.className = "col film-title";
        title.appendChild(svgDeleteFilm(f.title, id => {
            removeChildWithId(id, ul);
            library.deleteFilm(id);
        }));
        title.append(f.title);
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
};



const library = new FilmLibrary();

const filmToDisplay = library.films;

displayFilms(filmToDisplay);

setFilterEvents(library);
