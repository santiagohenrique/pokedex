import { useQuery } from '@tanstack/react-query';
import './assets/scss/styles.scss'
import PokemonList from "./components/pokemon/PokemonList"
import { fetchAllPokemons, fetchPokemonList } from './services/PokemonService';
import { useEffect, useState } from 'react';
import { ModalFilter } from './components/ModalFilter';
import { Header } from './components/Header';
import { PageButtons } from './components/PageButtons';
import { PokemonAPI } from './types/Pokemon';

function App() {

  const [pokemonUrl, setPokemonUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=24`);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [pokemonFilteredName, setPokemonFilteredName] = useState<string>('')
  const [pokemonFilteredType, setPokemonFilteredType] = useState<string>('')
  const [pokemonFilteredList, setPokemonFilteredList] = useState<PokemonAPI[]>([])
  const [filterActive, setFilterActive] = useState<boolean>(false)

  const { data: pokemonData, isLoading, isError } = useQuery({
    queryKey: ["standardPokemonList", pokemonUrl],
    queryFn: () => fetchPokemonList(pokemonUrl),
  });

  const { data: pokemonDataCached } = useQuery({
    queryKey: ["allPokemonsList", pokemonUrl],
    queryFn: () => fetchAllPokemons(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=24`),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });

  useEffect(() => {
    console.time("filter")
    const isActive = !!pokemonFilteredName || !!pokemonFilteredType;
    setFilterActive(isActive);
    if(isActive){
      let filteredPokemons;
      if (pokemonFilteredType) {
      filteredPokemons = pokemonDataCached?.pokemonList.filter((pokemon) =>
        pokemon.name.includes(pokemonFilteredName) &&
        pokemon.types.includes(pokemonFilteredType)
      );
      } else {
        filteredPokemons = pokemonDataCached?.pokemonList.filter((pokemon) =>
          pokemon.name.includes(pokemonFilteredName)
        );
      }
      setPokemonFilteredList(filteredPokemons || []);
      console.log(filteredPokemons)
    }
    console.log(filterActive)
    console.timeEnd("filter")
  }, [pokemonFilteredName, pokemonFilteredType, pokemonDataCached, filterActive])

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

  const handleFilter = () => {
    setPokemonFilteredName('')
    setPokemonFilteredType('')
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
        {filterActive && <button onClick={handleFilter}>Remover filtro</button>}
        <PokemonList pokemonList={filterActive === true? pokemonFilteredList : pokemonData?.pokemonList} />
        <PageButtons handlePrevious={handlePrevious} handleNext={handleNext} pokemonData={filterActive === true? pokemonDataCached : pokemonData}  />
      </div>
      {modalVisibility &&
        <ModalFilter 
          handleModalVisibility={handleModalVisibility} 
          setPokemonFilteredName={setPokemonFilteredName}
          setPokemonFilteredType={setPokemonFilteredType}
        />
      }
    </>
  )

}

export default App
