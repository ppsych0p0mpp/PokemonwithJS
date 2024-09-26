$(document).ready(function() {
    fetch("pokedex.json")
    .then((rawData) => rawData.json())
    .then((pokedex) => {
        //console.log(pokedex)
        pokedex.forEach(pokemon => {
            //console.log(pokemon)

            //Declare
            let id = "#" + (10000 + pokemon["id"]).toString().substring(1);
            let rid = pokemon["id"];
            let name = pokemon["name"]["english"];
            let image = pokemon["image"]["hires"];
            if (image==null)
            {
                image=pokemon["image"]["thumbnail"];
            }
            let types = pokemon["type"];
            let typeHTML = "";
            types.forEach(type =>{
                typeHTML += `<span class="${type}">${type}</span>`
            })
            
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
    });
})

function SetID(id){
    window.location.href="pokemon.html?"+"id="+--id;
};