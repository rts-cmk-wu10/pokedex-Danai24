const URL = new URLSearchParams(window.location.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
.then(function(response) {
    if (response.status === 200) {
        return response.json()
    } else {
        document.body.innerHTML += "Ups, noget gik galt. Prøv igen senere"
    }
})
.then(function(data) {
    const DIV = document.querySelector(".pokemon__name")
    DIV.innerHTML = `<section class="overall">
    <h1 class="name">${data.name}</h>
    <span class="imgePlaceholder">
    <svg height="180" width="400">
        <path d="M150 65 L30 200 L250 200 Z" />
        <path d="M250 35 L100 200 L350 200 Z" />
    </svg>
    </span>
    <p class="information">Height: ${data.height}</p>
    <p class="information">Weight: ${data.weight}</p>
    <div class="information">
    <p>Stats:</p>
    <ul class="ul_list">${data.stats.map(elem => 
        `<li class="li_list">${elem.stat.name}</li>`).join("")}
    </ul>
    </div>

    <div class="information">
    <p>Abilities:</p>
    <ul class="ul_list">${data.abilities.map(elem => 
        `<li class="li_list">${elem.ability.name}</li>`).join("")}
    </ul>
    </div>
    </section>`

    const IMG = new Image()
    IMG.src = data.sprites.other["official-artwork"].front_default

    IMG.onload = function() {
        DIV.querySelector(".imgePlaceholder svg").style.display = "none"
        DIV.querySelector(".imgePlaceholder").append(IMG)
    }
})



{/* <img src="${data.sprites.other["official-artwork"].front_default}" class="picture"> */}