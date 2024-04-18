import { useQuery } from '@tanstack/react-query';
import './assets/scss/styles.scss'
import PokemonList from "./components/pokemon/PokemonList"
import { fetchPokemonList } from './services/PokemonService';
import { useState } from 'react';
import { ModalFilter } from './components/ModalFilter';
import { Header } from './components/Header';
import { PageButtons } from './components/PageButtons';

function App() {

  const [pokemonUrl, setPokemonUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=24');
  const [modalVisibility, setModalVisibility] = useState(false);

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

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
  }

  if (isLoading){
    return (
      <div className="loading_container">
        <div className="mainball">
          <div className="pokebutton"></div>
        </div>
      </div>
    )
  } 

  if (isError) return <div>Error fetching data</div>;
  
  return (
    <>
      <Header handleModalVisibility={handleModalVisibility} />
      <div className="container">
        <PokemonList pokemonList={pokemonData?.pokemonList} />
        <PageButtons handlePrevious={handlePrevious} handleNext={handleNext} pokemonData={pokemonData}  />
      </div>
      {modalVisibility &&
        <ModalFilter 
          handleModalVisibility={handleModalVisibility} 
        />
      }
    </>
  )

}

export default App
