$(document).ready(function() {
    let pokedexData = []; // To store the pokedex data
    let filteredPokedex = []; // To store filtered results

    // Fetch and display the pokedex
    fetch("pokedex.json")
    .then((rawData) => rawData.json())
    .then((pokedex) => {
        pokedexData = pokedex;  // Store the full data in pokedexData
        filteredPokedex = pokedexData;  // Initially, show all Pokémon
        displayPokemons(filteredPokedex);  // Display all Pokémon

        // When search input changes, filter Pokémon
        $("#search").on("input", function() {
            let searchQuery = $(this).val().toLowerCase();  // Get the search term
            filteredPokedex = pokedexData.filter(pokemon => {
                let name = pokemon["name"]["english"].toLowerCase();
                let id = pokemon["id"].toString();
                return name.includes(searchQuery) || id.includes(searchQuery);
            });
            displayPokemons(filteredPokedex);  // Update displayed Pokémon based on filter
        });
    });

    // Function to display Pokémon based on filtered data
    function displayPokemons(pokedex) {
        $(".pokemon-container").empty();  // Clear the container before re-rendering

        pokedex.forEach(pokemon => {
            // Declare variables for each Pokemon's details
            let id = "#" + (10000 + pokemon["id"]).toString().substring(1);
            let rid = pokemon["id"];
            let name = pokemon["name"]["english"];
            let image = pokemon["image"]["hires"];
            if (image == null) {
                image = pokemon["image"]["thumbnail"];
            }
            let types = pokemon["type"];
            let typeHTML = "";
            types.forEach(type => {
                typeHTML += `<span class="${type}">${type}</span>`;
            });

            // Append the Pokémon card to the container
            $(".pokemon-container").append(
                `<a id="${rid}" onclick="SetID(${rid})" style="text-decoration:none;">
                    <div class="card ${types[0]}">
                        <div class="bg-img">
                            <img src="${image}" alt="${name}">
                        </div>
                        <ul type="none">
                            <li class="pokemon-id">${id}</li>
                            <li class="pokemon-name">${name}</li>
                            <li class="pokemon-type">
                                ${typeHTML}
                            </li>
                        </ul>
                    </div>
                </a>`
            );
        });
    }
});

// Function to handle redirection to details page
function SetID(id){
    window.location.href = "details.html?" + "id=" + --id;
};
