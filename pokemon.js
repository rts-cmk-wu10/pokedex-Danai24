const URL = new URLSearchParams(window.location.search)
const OFFSET = parseInt(URL.get("offset") || "0")
const NEXT_PAGE = document.querySelector(".nextPage")
const PREV_PAGE = document.querySelector(".prevPage")
const SEARCH_INPUT = document.getElementsByClassName(".search_bar");
const SEARCH_BUTTON = document.getElementsByClassName("submit");

fetch(`https://pokeapi.co/api/v2/pokemon?offset=${OFFSET}`)
.then(function(response) {
    if (response.status === 200) {
        return response.json()
    } else {
        
        document.body.innerHTML += "Ups, noget gik galt. Prøv igen"
    }
})
.then(function(data) {
    
    const LAST_OFFSET = data.count - (data.count % 20)
    NEXT_PAGE.href = `/?offset=${OFFSET >= LAST_OFFSET ? LAST_OFFSET : OFFSET + 20}`

    PREV_PAGE.href = `/?offset=${Math.max(OFFSET - 20, 0)}`
    
    const UL = document.querySelector(".pokamon__list")
    data.results.forEach(function(result) {
        const LI = document.createElement("li")
        LI.innerHTML = `<a href="/pokedex.html?name=${result.name}">${result.name}</a>`
        UL.append(LI)
    })
})

//search
const DATALIST = document.querySelector("#pokemons")
const SEARCH_FIELD = document.querySelector(".pokemon__search")

SEARCH_FIELD.addEventListener("focus", getDatalist)
SEARCH_FIELD.addEventListener("focusout", function(event) {
	SEARCH_FIELD.removeEventListener("focus", getDatalist)
})

function getDatalist(event) {
	fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
		.then(function(response) {
			// fejl tjek, hvis I vil (status kode 200 eller noget andet?)
			return response.json()
		})
		.then(function(data) {
			data.results.forEach(function(pokemon) {
				DATALIST.innerHTML += `<option>${pokemon.name}</option>`
			})
		})
}
