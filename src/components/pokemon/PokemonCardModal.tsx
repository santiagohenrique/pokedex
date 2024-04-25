import { Pokemon } from "../../types/Pokemon";
import { Button } from "../Button";

interface PokemonCardProps extends Pokemon{
    handleCardModalVisibility: () => void
    formatIdDisplay: (id: number) => string
}

export const PokemonCardModal = ( { id, name, image, types, stats, handleCardModalVisibility, formatIdDisplay}: PokemonCardProps ) => {
    return(
        <div className="pokemon_modal">
            <div className="modal_container">
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
                <div className="pokemon_stats">
                    <ul>
                        {Object.entries(stats).map(([statName, statValue], index) => (
                            <li key={index} className={`stat_${statName.toLowerCase()}`}>
                                <span>{statName}:</span> {statValue}
                                <div className="stat_bar_container">
                                    <div className="stat_bar" style={{ width: `${(statValue / 255) * 100}%` }}></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Button className="btn_close" onClick={handleCardModalVisibility} text="&times;" />
            </div>
        </div>
    );
}