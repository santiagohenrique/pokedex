import { useQuery } from '@tanstack/react-query';
import './assets/scss/styles.scss'
import PokemonList from "./components/pokemon/PokemonList"
import { fetchAllPokemons, fetchPokemonList } from './services/PokemonService';
import { useEffect, useState } from 'react';
import { ModalFilter } from './components/ModalFilter';
import { Header } from './components/Header';
import { PageButtons } from './components/PageButtons';
import { PokemonAPI } from './types/Pokemon';
import { Loader } from './components/Loader';

function App() {

  const [pokemonUrl, setPokemonUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=24`);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [pokemonFilter, setPokemonFilter] = useState({
    name: '',
    type: ''
  })
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
    const isActive = !!pokemonFilter.name || !!pokemonFilter.type;
    setFilterActive(isActive);
    if(isActive){
      const filteredPokemons = pokemonDataCached?.pokemonList.filter((pokemon) =>
        (!pokemonFilter.name || pokemon.name.includes(pokemonFilter.name)) &&
        (!pokemonFilter.type || pokemon.types.includes(pokemonFilter.type))
      );
      setPokemonFilteredList(filteredPokemons || []);
      console.log(filteredPokemons)
    }
    console.log(filterActive)
    console.timeEnd("filter")
  }, [pokemonFilter.name, pokemonFilter.type, pokemonDataCached, filterActive])

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
    setPokemonFilter({
      name: '',
      type: ''
    })
  }

  if (isLoading){
    return (
      <Loader />
    )
  } 

  if (isError) return <div>Error fetching data</div>;
  
  return (
    <>
      <Header handleModalVisibility={handleModalVisibility} />
      <div className="container">
        {filterActive && <button onClick={handleFilter}>Remover filtro</button>}
        <PokemonList pokemonList={filterActive ? pokemonFilteredList : pokemonData?.pokemonList} />
        <PageButtons handlePrevious={handlePrevious} handleNext={handleNext} pokemonData={filterActive ? pokemonDataCached : pokemonData}  />
      </div>
      {modalVisibility &&
        <ModalFilter 
          handleModalVisibility={handleModalVisibility} 
          setPokemonFilter={setPokemonFilter}
        />
      }
    </>
  )

}

export default App
