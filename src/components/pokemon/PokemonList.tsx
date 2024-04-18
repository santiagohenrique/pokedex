import { PokemonCard } from "./PokemonCard";
import { Pokemon, PokemonAPI } from "../../types/Pokemon";

interface PokemonListProps{
    pokemonList: PokemonAPI[] | undefined
}

function PokemonList( { pokemonList }: PokemonListProps ) {

    return (
        <div className="pokemon_list">
            {pokemonList && pokemonList.length > 0 ? pokemonList.map((pokemon: Pokemon) => (
                <PokemonCard 
                    id={pokemon.id} 
                    name={ pokemon.name } 
                    image={pokemon.image} 
                    types={pokemon.types} 
                    key={pokemon.name} 
                    stats={pokemon.stats}  
                />
            )) : 'Nenhum resultado foi encontrado!'}
        </div>
    );
}

export default PokemonList;
