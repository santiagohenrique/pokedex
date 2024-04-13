import { Pokemon } from "../../types/Pokemon";

interface PokemonCardProps extends Pokemon{
    handleCardModalVisibility: () => void
}

export const PokemonCardModal = ( { id, name, image, types, handleCardModalVisibility}: PokemonCardProps ) => {
    return(
        <div className="pokemon_modal">
            <div className="modal_container">
                <div>
                    <div className="pokemon_id">
                        <span>{id}</span>
                    </div>
                    <div className="pokemon_image">
                        <img src={image} alt="" />
                    </div>
                    <div className="pokemon_name">
                        {name} 
                    </div>
                    <ul className="pokemon_types">
                        {types.map((type, index) => (
                        <li className={`${type}`} key={index}>{type}</li>
                        ))}
                    </ul>
                </div>
                <button className="btn_close" onClick={handleCardModalVisibility}>&times;</button>
            </div>
        </div>
    );
}