let input = document.querySelector('input')
let button = document.querySelector('button')

let h5 = document.querySelector('#name')
let img = document.querySelector('#img-display')
let h5Error = document.querySelector('#h5-Error')

let pokemonsList;


async function getPokemons() {

  try {

    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1126')
    let { results } = await res.json()
    pokemonsList = results;
    console.log(pokemonsList)
  } catch (error) {
    console.error(error);
  }
}

getPokemons()



async function printPokemon(name) {
  try {
    const getName = pokemonsList.find((pokemon) => pokemon.name === name);


    const res = await fetch(getName.url);
    const data = await res.json()
    console.log(data)
    h5.innerHTML = `<h6>${data.name}</h6>`;
    pokemonObj(data)

  } catch (error) {
    console.error('Hay que encontrar ese Pokemon')
  }
}

function pokemonObj(pokemon) {

  for(let i = 0;i< pokemon.length; i++){
    console.log(pokemon[i])
  }

}


function handleSearchPokemon(e) {
  e.preventDefault();

  let nameInput = input.value;
  console.log(nameInput)
  if(!nameInput){
    h5Error.innerHTML = `
      <h5>${'Pon el nombre de un Pokemon castron!!!'}</h5>
    `
  } 
  const filterName = pokemonsList.filter((item) =>
    item.name.substring(0, 3).toLowerCase() === nameInput.substring(0, 3).toLowerCase())
  for (let i = 0; i < filterName.length; i++) {
    printPokemon(filterName[i].name)
    console.log(filterName[i])
  }

}


button.addEventListener('click', handleSearchPokemon)


/* #article-rigth {
    background-color: red;
    position: absolute;
    margin-right:730px;

    right: 0;
    transform: translateZ(180deg) rotateY(180deg);
    transition: all 1s;

}

#article-rigth:hover{
    transform-style: preserve-3d;
    transform-origin: right;
	
    transform: rotateY(180deg);
} */