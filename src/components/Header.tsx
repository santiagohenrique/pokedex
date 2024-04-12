import pokemonLogo from '../assets/svgs/pokemon_logo.svg'

interface HeaderProps{
    handleModalVisibility: () => void;
}

export const Header = ( { handleModalVisibility }:HeaderProps ) => {
    return(
        <header id="header">
        <div className="container">
            <div className="logo_container">
                <img src={pokemonLogo} alt="" />
            </div>
            <button onClick={ handleModalVisibility } className="btn_filter">
                Busca avançada
            </button>
        </div>
        </header>
    );
}