import { PokemonCard } from "./PokemonCard";
import { Pokemon, PokemonAPI } from "../../types/Pokemon";

interface PokemonListProps{
    pokemonList: PokemonAPI[] | undefined
}

function PokemonList( { pokemonList }:PokemonListProps ) {

    return (
        <div className="pokemon_list">
            {pokemonList?.map((pokemon: Pokemon) => (
                <PokemonCard name={ pokemon.name } image={pokemon.image} types={pokemon.types}  />
            ))}
        </div>
    );
}

export default PokemonList;
