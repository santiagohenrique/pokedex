import { useQuery } from '@tanstack/react-query';
import './assets/scss/style.scss'
import PokemonList from "./components/pokemon/PokemonList"
import { fetchPokemonList } from './services/PokemonService';
import { useState } from 'react';
import pokemonLogo from './assets/svgs/pokemon_logo.svg'
import { ModalFilter } from './components/ModalFilter';

function App() {

  const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=24');
  const [modalVisibility, setModalVisibility] = useState(false)

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
    <>
      <header id="header">
        <div className="container">
          <div className="logo_container">
            <img src={pokemonLogo} alt="" />
          </div>
          <button onClick={() => { setModalVisibility(!modalVisibility) }} className="btn_filter">
            Busca avançada
          </button>
        </div>
      </header>
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
              Próximo &gt;
            </button>
          }
        </div>
      </div>
      {modalVisibility &&
        <ModalFilter setModalVisibility={setModalVisibility} />
      }
      
    </>
  )

}

export default App
