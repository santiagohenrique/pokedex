import { Pokemon } from "../../types/Pokemon";

export const PokemonCard = ( { name, image, types }: Pokemon ) => {

    return(
        <div className="pokemon_card">
            <div className="pokemon_image">
                <img src={image} alt="" />
            </div>
            <div className="pokemon_name">
                {name} 
            </div>
            <ul className="pokemon_types">
                {types.map((type, index) => (
                <li key={index}>{type}</li>
                ))}
            </ul>
        </div>
    );
}