import { APIData } from "../services/PokemonService";
import { Button } from "./Button";

interface PageButtonsProps{
    handlePrevious: () => void,
    handleNext: () => void,
    pokemonData: APIData | undefined
}

export const PageButtons = ( { handlePrevious, handleNext, pokemonData }:PageButtonsProps ) => {

    return(
        <div className="buttons_container">
            {
                pokemonData?.previous &&
                <Button className="btn_previous" onClick={handlePrevious} text="&lt; Anterior" />
            }
            {
                pokemonData?.next &&
                <Button className="btn_next" onClick={handleNext} text="Próximo &gt;" />
            }
        </div>
    );
}