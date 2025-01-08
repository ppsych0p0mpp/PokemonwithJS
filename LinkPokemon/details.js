let nid = new URLSearchParams(window.location.search).get("id");
$(document).ready(function () {
    // Add color-changing background animation
    $('body').append('<div class="background-animation"></div>');

    //Fetch and display Pokemon data
    fetchPokemonData();
});

function fetchPokemonData() {
    fetch("pokedex.json")
    .then((rawData) => rawData.json())
    .then((pokedex) => {
        let pokemon = pokedex[nid];

        let id = (10000 + pokemon["id"]).toString().substring(1);
        let name = pokemon["name"]["english"];
        let types = pokemon["type"];
        let typeHTML = "";
        types.forEach(type => {
            typeHTML += `<span class="${type}">${type}</span>`
        })
        let species = pokemon["species"];
        let description = pokemon["description"];
        let image = pokemon["image"]["hires"];
        if (image == null) {
            image = pokemon["image"]["thumbnail"];
        }
        let sprite = pokemon["image"]["sprite"];
        let height = pokemon["profile"]["height"];
        let weight = pokemon["profile"]["weight"];
        let abilities = pokemon["profile"]["ability"];
        let abilitiesHTML = "";
        abilities.forEach(ability => {
            abilitiesHTML += `<span class="${ability[0]}"> ${ability[0]} </span>`;
        })

        //display
        $(".pokemon-container").html(
            `
            <div class="pokemon-details">
                <div class="container-head">
                <span>
                </span>
                
                </div>
                <div class="pokemon-sprite">
                <span>
                    <h1>${name}</h1>
                    <img src="${image}">
                    <p>${description}</p>
                    </span>
                </div>
                <div class="pokemon-stats">
                    <div class="pokedex-data">
                    </div>
                    <div class="base-stats">
                        <h2>Base stats</h2>
                        <table>
                            <tbody class="stats">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`
        );
        //Pokedex data
        $(".pokedex-data").append(
            `<h2>Pokédex Data</h2>
            <table>
                <tbody>
                    <tr>
                        <td><b>National No:</b></td>
                        <td>${id}</td>
                    </tr>
                    <tr>
                        <td><b>Type:</b></td>
                        <td>${typeHTML}</td>
                    </tr>
                    <tr>
                        <td><b>Species:</b></td>
                        <td>${species}</td>
                    </tr>
                    <tr>
                        <td><b>Height:</b></td>
                        <td>${height}</td>
                    </tr>
                    <tr>
                        <td><b>Weight:</b></td>
                        <td>${weight}</td>
                    </tr>
                    <tr>
                        <td><b>Abilities:</b></td>
                        <td>${abilitiesHTML}</td>
                    </tr>
                </tbody>
            </table>`
        )
        //Pokmon stats
        base = pokemon["base"];
        for (const stat in base) {
            $(".stats").append(
                `<tr>
                    <td width="20%">${stat}</td>
                    <td width="10%">${base[stat]}</td>
                    <td width="70%">
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(base[stat]/255)*100}%"></div>
                        </div>
                    </td>
                </tr>`
            );
        }
    });
}
