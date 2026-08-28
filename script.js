let videos = [];

// On charge maintenant le fichier videos.json
fetch('videos.json')
    .then(response => response.json())
    .then(data => {
        videos = data;
        displayVideos(videos);
    })
    .catch(error => console.error('Erreur lors du chargement des vidéos:', error));

function displayVideos(videoList) {
    const grid = document.getElementById('videosGrid');
    grid.innerHTML = '';

    if (videoList.length === 0) {
        grid.innerHTML = '<p>Aucune vidéo trouvée.</p>';
        return;
    }

    videoList.forEach(video => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${video.thumbnail}" alt="Miniature de ${video.title}">
            <div class="card-body">
                <div class="card-date">${video.date}</div>
                <h3 class="card-title">${video.title}</h3>
                <p class="card-desc">${video.description}</p>
                <a href="${video.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-watch">
                    ▶ Regarder la vidéo
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm) || 
        video.description.toLowerCase().includes(searchTerm)
    );
    displayVideos(filteredVideos);
});
