import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../../services/PokemonService";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../../types/Pokemon";

function PokemonList() {

    const { data: pokemonList, isLoading, isError } = useQuery({
        queryKey: ["pokemons"],
        queryFn: fetchPokemonList
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div className="pokemon_list">
            {pokemonList?.map((pokemon: Pokemon) => (
                <PokemonCard name={ pokemon.name } image={pokemon.image} types={pokemon.types}  />
            ))}
        </div>
    );
}

export default PokemonList;
