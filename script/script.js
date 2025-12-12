let allMoviesData = [];



document.addEventListener('DOMContentLoaded', () => {
    fetch('movies-pi-murex.vercel.app')
        .then(response => response.json())
        .then(data => {
            allMoviesData = data;
            renderCards(allMoviesData);
            const searchButton = document.querySelector('.search-button');
            searchButton.addEventListener('click', filterMovies)
        })
        .catch(error => console.error('Error fetching data:', error));

})


function renderCards(movies) {
    const catalog = document.querySelector('.catalog');
    catalog.innerHTML = ''
    if (movies.length === 0) {
        catalog.innerHTML = '<p class="not-found">По вашему запросу ничего не найдено.</p>';
        return;
    }
    movies.forEach(item => {
        const card = document.createElement('article');
        card.classList.add('movie-item');
        card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="movie-item__img">
                    <h2 class="movie-item__title">${item.title}</h2>
                    <span class="movie-item__text">${item.year}</span>
                    `;

        card.addEventListener('click', () => {
            const cardBody = document.querySelector('.card-body');
            const hiddenCard = document.querySelector('.hidden-card');
            cardBody.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="card-body__img">
                        <div class="card-body-info">
                            <h2 class="card-body-info__title">${item.title}</h2>
                            <span class="card-body-info__year">${item.year}</span>
                            <span class="card-body-info__genre">${item.genre}</span>
                            <p class="card-body-info__description">${item.description}</p>
                            <span class="card-body-info__rating">${item.rating}</span>
                        </div>
                `;
            hiddenCard.style.display = 'block';
            document.body.classList.add('noscroll');
            const closeBtn = document.querySelector('.close-button')
            closeBtn.addEventListener('click', () => {
                hiddenCard.style.display = 'none';
                document.body.classList.remove('noscroll');
            })

        });

        catalog.appendChild(card);

    });
}

function filterMovies() {

    const searchInput = document.getElementById('search-input');
    const filter = searchInput.value.toLowerCase();
    const searchMovies = allMoviesData.filter(movie => {
        return movie.title.toLowerCase().includes(filter);
    })
    renderCards(searchMovies)
    searchInput.value = '';

}