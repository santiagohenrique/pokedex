import pokemonLogo from '../assets/svgs/pokemon_logo.svg'
import { Button } from './Button';

interface HeaderProps{
    handleModalVisibility: () => void;
}

export const Header = ( { handleModalVisibility }: HeaderProps ) => {
    return(
        <header id="header">
        <div className="container">
            <div className="logo_container">
                <img src={pokemonLogo} alt="" />
            </div>
            <Button className="btn_filter" onClick={handleModalVisibility} text="Busca avançada" />
        </div>
        </header>
    );
}