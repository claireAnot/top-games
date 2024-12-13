// initialize variable
let carsList

fetch("http://localhost:3000/api/cars", {
	method: "GET",
	headers: {
		"x-api-key": "secret_phrase_here",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})
	.then((res) => {
		if (!res.ok) {
			console.log("your API isn't working !!!")
		}
		res.json().then((data) => {
			carsList = data // Mise à jour de la liste des voitures avec les données récupérées
			writeDom()  // APRÈS que les données aient été récupérées 
			
			var editButtons = document.querySelectorAll(".edit")
			editButtons.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					editModal(e.target.getAttribute("data-edit-id"))
				})
			})

			var viewButtons = document.querySelectorAll(".view")
			viewButtons.forEach((btn) => {
				btn.addEventListener("click", (e) => {
					viewModal(e.target.getAttribute("data-view-id"))
				})
			})
		})
	})
	.catch((error) =>
		console.error("Erreur lors de la récupération des voitures :", error)
	)


function writeDom() {
    carsList.forEach((car) => {
        const articleContainer = document.querySelector(".row")
		articleContainer.innerHTML += `
        <article class="col">
        <div class="card shadow-sm">
            <img src="${car.carImage}" alt="${car.carName}" class="card-img-top" />
            <div class="card-body">
            <h3 class="card-title">${car.carName}</h3>
                <p class="card-text">${car.carYear}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-secondary view" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-view-id="${car.id}"
                            >
                                View
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-sm btn-outline-secondary edit" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"
                            data-edit-id="${car.id}"
                            >
                                Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `
    })
}


function editModal(carId) {
	fetch(`http://localhost:3000/api/cars/${carId}`, {
		method: "GET",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	}).then((res) => {
		if (!res.ok) {
			throw new Error("Error with the car with this id")
		}
		res.json().then((data) => {
			const selectedCar = data

			// Injectez le formulaire dans le corps du modal
			fetch("./form.html").then((data) => {
				data.text().then((form) => {
					// Modifiez le titre et le corps du modal
					modifyModal("Mode Edition", form)
					modifyForm({
						title: selectedCar.carName,
						year: selectedCar.carYear,
						imageUrl: selectedCar.carImage,
					})
					document.querySelector(".form-img").src = selectedCar.carImage
					document
						.querySelector('button[type="submit"]')
						.addEventListener("click", () => {
							updateCars(title.value, year.value, imageUrl.value, carId)
					})
				})
			})
		})
	})
	.catch((error) =>
		console.error("Erreur lors de la récupération des voitures :", error)
	)
}


function viewModal(carId) {
	// Trouvez la voiture en fonction de son identifiant
	fetch(`http://localhost:3000/api/cars/${carId}`, {
		method: "GET",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error("Error with the car with this id")
			}
			res.json().then((data) => {
				const selectedCar = data
				// passer une image comme corps du modal
				const modalBody = `<img src="${selectedCar.carImage}" alt="${selectedCar.carName}" class="img-fluid" />`
				modifyModal(selectedCar.carName, modalBody)

				// Écrire dans le footer
				document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
</form>`
			})
		})
		.catch((error) =>
			console.error("Erreur lors de la récupération des voitures :", error)
		)
}

function modifyModal(modalTitle, modalBody) {
	document.querySelector(".modal-title").textContent = modalTitle
    document.querySelector(".modal-body").innerHTML = modalBody
    document.querySelector(".modal-footer").innerHTML = `
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Close
		</button>
		<button type="submit" 
				data-bs-dismiss="modal" 
				class="btn btn-primary">
				Submit
		</button>
</form>`
}

function modifyForm(carData) {
	const form = document.querySelector("form")

	form.title.value = carData.title
	form.year.value = carData.year
	form.imageUrl.value = carData.imageUrl
}


function updateCars(carName, carYear, carImage, carId) {
	const index = carsList.findIndex((car) => car.id === parseInt(carId))

	carsList[index].carName = carName
	carsList[index].carYear = parseInt(carYear)
	carsList[index].carImage = carImage
	
	document.querySelector(".row").innerHTML = "" // Nous supprimons toutes les données des jeux dans le DOM.
	writeDom()
	
	editButtons = document.querySelectorAll(".edit")
	editButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			editModal(e.target.getAttribute("data-edit-id"))
		})
	})
	
	viewButtons = document.querySelectorAll(".view")
	viewButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			viewModal(e.target.getAttribute("data-view-id"))
		})
	})

	const formdata = {
		carName,
		carYear,
		carImage,
		carId,
	}

	fetch(`http://localhost:3000/api/cars/${carId}`, {
		method: "PUT",
		headers: {
			"x-api-key": "secret_phrase_here",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(formdata),
	})
}