"use strict";

const input = document.querySelector("#search input");

const button = document.querySelector("#search button");

const p = document.querySelector("#pokemonArticle > p");

let sectionArticle = document.querySelector("#pokemonArticle");




//Funciones para sacar info de la API

async function getData(url) {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon");
    let data = await res.json();
    let names = data.results;
    console.log(names)
    return data;
  } catch (e) {
    console.error(e);
  }
}
async function filterPokemon(input) {
  try {
    let pokemon = names.filter((name) => input === name.name);

    let namePokemon = pokemon[0].name;

    let dataPokemon = await getData(pokemon[0].url);

    //funcion que pinta el article
    printPokemon(dataPokemon);
  } catch (e) {
    try {
      if (input.length > 2) {
        let inputTwoLetter = input.slice(0, 3);
        console.log(inputTwoLetter);

        let namesOptions = names.filter(
          (name) =>
            name.name[0] + name.name[1] + name.name[2] === inputTwoLetter
        );

        console.log(namesOptions);
        if (namesOptions.length === 0) {
          alert("No hay coincidencias");
        } else {
          for (let nameOption of namesOptions) {
            console.log(nameOption);
            let dataPokemon = await getData(nameOption.url);
            printPokemon(dataPokemon);
          }
        }
      } else {
        alert("Mínimo hay que escribir 3 letras");
      }
    } catch (e) {
      console.error("No hay coincidencias");
    }
  }
}

function printPokemon(dataPokemon) {
  let newArticle = document.createElement("article");

  sectionArticle.append(newArticle);

  let articlePokemon = (newArticle.innerHTML = `
    <h2>${dataPokemon.name.toUpperCase()} </h2>
    <figure>
        <img src="${dataPokemon.sprites.front_default}"
            alt="{${dataPokemon.name}}">
        <img src="${dataPokemon.sprites.back_default}"
            alt="${dataPokemon.name}">
    </figure>
    <ul>
    <li>Altura: ${dataPokemon.height / 10} m</li>
    <li>Peso: ${dataPokemon.weight / 10} Kg</li>
    <li>Puntos de vida: </li>
    <li>Ataque: ${dataPokemon.stats[1].base_stat}</li>
    <li>Defensa: ${dataPokemon.stats[2].base_stat}</li>
    <li>Velocidad: ${dataPokemon.stats[5].base_stat}</li>
    <li>Tipos a los que pertenece: ${dataPokemon.types[0].type.name} </li>
    </ul>`);

  console.log(articlePokemon);
}

function handleClick() {
  let inputValue = input.value;
  console.log(inputValue);
  return inputValue;
}

function handleRemovePokemon() {
  if (articlePokemon) {
    articlePokemon.remove();
  }
}

// button.addEventListener("click", () => filterPokemon(handleClick()));
// button.addEventListener("click", () => p.remove());