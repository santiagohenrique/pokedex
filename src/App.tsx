import { useQuery } from '@tanstack/react-query';
import './assets/scss/style.scss'
import PokemonList from "./components/pokemon/PokemonList"
import { fetchPokemonList } from './services/PokemonService';
import { useState } from 'react';

function App() {

  const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=24');

  const { data: pokemonData, isLoading, isError } = useQuery({
    queryKey: ["pokemons", pokemonUrl],
    queryFn: () => fetchPokemonList(pokemonUrl)
  });

  const handlePrevious = () => {
    if (pokemonData && pokemonData.previous) {
      setPokemonUrl(pokemonData.previous);
    }
  };

  const handleNext = () => {
    if (pokemonData && pokemonData.next) {
      setPokemonUrl(pokemonData.next);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  
  return (
    <div>
      <h1>List of Pokemons</h1>
      <div className="container">
        <PokemonList pokemonList={pokemonData?.pokemonList} />
        <div className="buttons_container">
          {pokemonData?.previous &&
            <button className="btn_previous" onClick={handlePrevious}>
              &lt; Anterior
            </button>
          }
          {
            pokemonData?.next &&
            <button className="btn_next" onClick={handleNext}>
              Próxima &gt;
            </button>
          }
        </div>
      </div>

    </div>
  )

}

export default App
