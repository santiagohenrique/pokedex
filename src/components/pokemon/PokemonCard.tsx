import { useState } from "react";
import { Pokemon } from "../../types/Pokemon";
import { PokemonCardModal } from "./PokemonCardModal";

export const PokemonCard = ( { id, name, image, types }: Pokemon ) => {

    const[cardModalVisibility, setCardModalVisibility] = useState(false)

    const formatIdDisplay = (id: number) => {
        return "#" + id.toString().padStart(4, '0');
    }

    const handleCardModalVisibility = () => {
        setCardModalVisibility(!cardModalVisibility)
    }

    
    return(
        <>
            <div className="pokemon_card" onClick={handleCardModalVisibility}>
                <div className="pokemon_id">
                    <span>{formatIdDisplay(id)}</span>
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
            {  
                cardModalVisibility && 
                <PokemonCardModal id={id} name={name}image={image} types={types} handleCardModalVisibility={handleCardModalVisibility} />
            }
        </>
    );
}