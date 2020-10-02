// Obtenemos la API por medio de promesas
/**
 * fecth() esto es nuevo en JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en promesas
 * sistema de peticiones y respuestas 
 */

//Botones de paginacion
const prevButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
//URL de la API
const API = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24";

let prevPage = undefined;
let nextPage = undefined;
let count = undefined; 
let currentPage = 1;

//Obtener el retorno de la API
const getData = (api, append) => {
     fetch(api)
        //Obtengo listado de pokemons y solicito generacion de json
        .then((response) => response.json())
        //Obtengo el listado de las url de cada pokemon y hago peticion al servidor
        .then((response) => {
            prevPage= response.previous;
            nextPage= response.next;
            count = response.count;
            return Promise.all(response.results.map(pokemon => fetch(pokemon.url)))
        })
        //Obtnego listado de la informacion de cada pokemon y solicito generacion de json
        .then(response => Promise.all(response.map(res => res.json())))
        //La informacion de cada pokemon la envio a Llenar datos para pintar las tarjetas
        .then(response => {
            if(!append) document.getElementById("datosPersonajes").innerHTML = '';
            response.forEach(pokemon => llenarDatos(pokemon, append))
        })
        .catch(error => console.log('Error', error))
}

// llenar datos en nuestra pagina

const llenarDatos = (pokemon) => {
    let html = document.getElementById("datosPersonajes").innerHTML;

    html += '<div class="col-6 col-md-3 col-lg-3">';
    html += '<div class="card shadow-sm rounded-lg my-3 pokemon-card" style="">';
    html += `<img src="${pokemon.sprites.other['official-artwork']['front_default']}" class="card-img-top" alt="...">`;
    html += '<div class="card-body">';
    html += `<div class="row justify-content-center"><h5 class="card-title text-center">${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}</h5></div>`;
    html += `<div clas="col" style="font-size: 14px;">
                <div clas="row"><label><span class="font-weight-bold">Height: </span>${pokemon.height}</label></div>
                <div clas="row"><label><span class="font-weight-bold">XP: </span>${pokemon['base_experience']}</label></div>
                <div clas="row"><label><span class="font-weight-bold">Abilities: </span>${pokemon.abilities.map(item => item.ability.name).join(', ')}</label></div>
            </div>`;
    html += `<div clas="row d-flex flex-wrap">
            ${pokemon.stats.map(item => '<label class="badge badge-secondary mx-1"><span class="font-weight-bold">'+ item.stat.name +': </span>'+ item['base_stat'] +'</label>').join('')}
    </div>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';

    document.getElementById("datosPersonajes").innerHTML = html;
}


prevButton.addEventListener('click', () =>{
    if(prevPage){
        getData(prevPage, false);
        currentPage--;
        prevButton.innerText = 'Página ' + (currentPage-1);
        nextButton.innerText = 'Página ' + (currentPage+1);
    }
});

nextButton.addEventListener('click', () =>{
    if(nextPage){
        getData(nextPage, false);
        currentPage++;
        prevButton.innerText = 'Página ' + (currentPage-1);
        nextButton.innerText = 'Página ' + (currentPage+1);
    }
});

// Activo o invoco la funcion
getData(API, true);