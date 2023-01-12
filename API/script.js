
const input = document.getElementById("input")
const button = document.querySelector("button");
const h5 = document.querySelector("h5")
const img = document.querySelector("img")

async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
}


async function getPokemons() {
  let text = input.value
  await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126${text}`)
    .then(res => res.json())
    .then(data => {
      let getFilter = data.results.filter(result => result.name.includes(text))
      getPokemon(getFilter)
    });
}

async function getPokemon(pokemon) {
  // const name = pokemon?.name;
  // console.log(pokemon)
  const fullPokemon = await pokemon.map((poke) => {
    return {
      url:  fetch(poke.url)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          const pokemonObj = Object.create({
            name: data.name,
            img1: data.sprites,
            img2: data.sprites.back_default,
            heigth: data.height,
            weight: data.weight
          })
          printPoke(pokemonObj)
        })
    }
  })
}

function mapUrl(data) {
  return data.map(e => e.url)
}

function printPoke(pokemons) {
  console.log(pokemons)
  // let name = pokemons.name;
  
  let img2 = String(pokemons.img1);
  console.log(img2)
  // let heigth = pokemons.heigth;
  // let weight = pokemons.weight;
  // console.log(name)
  // console.log(img1)
  // console.log(img2)
  // console.log(heigth)
  // console.log(weight)
  // h5.innerHTML += `<h5>${name}</h5> `
  // h5.innerHTML += `<h5>${heigth}</h5> `
  // h5.innerHTML += `<h5>${weight}</h5> 
}

button.addEventListener("click", getPokemons)