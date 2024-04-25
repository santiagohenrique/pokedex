import { PokemonCard } from "./PokemonCard";
import { Pokemon, PokemonAPI } from "../../types/Pokemon";

interface PokemonListProps{
    pokemonList: PokemonAPI[] | undefined
}

function PokemonList( { pokemonList }: PokemonListProps ) {

    return (
        <>
            {pokemonList && pokemonList.length > 0 ? (
                <div className="pokemon_list">
                    {pokemonList.map((pokemon: Pokemon) => (
                        <PokemonCard 
                            id={pokemon.id} 
                            name={ pokemon.name } 
                            image={pokemon.image} 
                            types={pokemon.types} 
                            key={pokemon.name} 
                            stats={pokemon.stats}  
                        />
                    ))}
                </div>
            ) : (
                <div className="empty_list_message">
                    <p className="empty_list_title"> Nenhum resultado foi encontrado! </p>
                    <p>Sugestão:</p>
                    <ul className="empty_list_suggetions_list">
                        <li>Verifique os filtros preenchidos</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default PokemonList;
