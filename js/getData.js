// Obtenemos la API por medio de promesas
/**
 * fecth() esto es nuevo en JS
 * permite controlar errores mas facilmente
 * trabaja por medio de http o https y se basa en promesas
 * sistema de peticiones y respuestas 
 */

//URL de la API
const API = "https://rickandmortyapi.com/api/character";
//Obtener el retorno de la API
const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json);
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

// llenar datos en nuestra pagina

const llenarDatos = (data) => {
    let html = "";
    data.results.forEach((pj) => {
        html += '<div class="col">';
        html += '<div class="card" style="width: 10rem;">';
        html += `<img src="${pj.image}" class="card-img-top" alt="...">`;
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${pj.name}</h5>`;
        html += `<p class="card-text">Especie :${pj.species} </p>`;
        html += '</div>';
        html += '</div>';
        html += '</div>';

    });
    // Imprimir datos en HTML
    document.getElementById("datosPersonajes").innerHTML = html;
}

// Activo o invoco la funcion
getData(API);