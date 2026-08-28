let games = [];

// Charger la liste des jeux depuis le fichier games.json
fetch('games.json')
    .then(response => response.json())
    .then(data => {
        games = data;
        displayGames(games);
    })
    .catch(error => console.error('Erreur lors du chargement des jeux:', error));

// Fonction pour afficher les jeux
function displayGames(gamesList) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = '';

    if (gamesList.length === 0) {
        grid.innerHTML = '<p>Aucun jeu trouvé.</p>';
        return;
    }

    gamesList.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <div class="card-body">
                <div class="card-genre">${game.genre}</div>
                <h3 class="card-title">${game.title}</h3>
                <p class="card-desc">${game.description}</p>
                <a href="${game.downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-download">
                    Télécharger
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Recherche instantanée
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = games.filter(game => 
        game.title.toLowerCase().includes(searchTerm) || 
        game.genre.toLowerCase().includes(searchTerm)
    );
    displayGames(filteredGames);
});