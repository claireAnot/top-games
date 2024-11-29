const gamesList = [
	{
		title: "Stardew Valley",
		year: 2016,
		imageUrl:
			"https://www.radiofrance.fr/s3/cruiser-production/2017/10/9d890b40-340b-4fa3-98c6-89983dcffd9c/870x489_meastardew.webp",
		id: 1,
	},
	{
		title: "Minecraft",
		year: 2009,
		imageUrl:
			"https://m.media-amazon.com/images/I/61smNbXSW1L._AC_UF1000,1000_QL80_.jpg",
		id: 2,
	},
	{
		title: "Portal",
		year: 2007,
		imageUrl:
			"https://trustmyscience.com/wp-content/uploads/2017/02/maxresdefault-768x427.jpg",
		id: 3,
	},
	{
		title: "Street Fighter V",
		year: 2015,
		imageUrl:
			"https://gaming-cdn.com/images/products/671/orig/street-fighter-v-pc-jeu-steam-cover.jpg?v=1662539255",
		id: 4,
	},
	{
		title: "Half Life 2",
		year: 2004,
		imageUrl:
			"https://gaming-cdn.com/images/products/2284/orig/half-life-2-pc-mac-game-steam-cover.jpg?v=1650555068",
		id: 5,
	},
	{
		title: "Skyrim",
		year: 2011,
		imageUrl:
			"https://gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-pc-jeu-steam-europe-cover.jpg?v=1661270991",
		id: 6,
	},
]


function writeDom() {
    gamesList.forEach((game) => {
        const articleContainer = document.querySelector(".row")
		articleContainer.innerHTML += `
        <article class="col">
        <div class="card shadow-sm">
            <img src="${game.imageUrl}" alt="${game.title}" class="card-img-top" />
            <div class="card-body">
            <h3 class="card-title">${game.title}</h3>
                <p class="card-text">${game.year}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `
    })
}

writeDom()