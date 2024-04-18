import { APIData } from "../services/PokemonService";

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
                <button className="btn_previous" onClick={handlePrevious}>
                &lt; Anterior
                </button>
            }
            {
                pokemonData?.next &&
                <button className="btn_next" onClick={handleNext}>
                Próximo &gt;
                </button>
            }
        </div>
    );
}