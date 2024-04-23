import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
interface ModalFilterProps{
    handleModalVisibility: () => void;
    setPokemonFilteredName: Dispatch<SetStateAction<string>>
    setPokemonFilteredType: Dispatch<SetStateAction<string>>
}

export const ModalFilter = ( { handleModalVisibility, setPokemonFilteredName, setPokemonFilteredType }:ModalFilterProps ) => {

    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('')

    const applyFilter = () => {
        setPokemonFilteredName(name)
        setPokemonFilteredType(type)
    }

    return(
        <div className="modal">
            <div className="modal_container">
                <div className="filter_container">
                    <div className="input_container">
                        <label htmlFor="name">Nome de pokémon</label>
                        <input
                            type="text"
                            className="search_bar"
                            placeholder="Filtrar por nome"
                            value={name}
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="select_container">
                        <span>Selecione um tipo</span>
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Todos os tipos</option>
                            <option value="fire">Fire</option>
                            <option value="grass">Grass</option>
                            <option value="water">Water</option>
                            <option value="electric">Electric</option>
                            <option value="normal">Normal</option>
                            <option value="ice">Ice</option>
                            <option value="fighting">Fighting</option>
                            <option value="poison">Poison</option>
                            <option value="ground">Ground</option>
                            <option value="flying">Flying</option>
                            <option value="psychic">Psychic</option>
                            <option value="bug">Bug</option>
                            <option value="rock">Rock</option>
                            <option value="ghost">Ghost</option>
                            <option value="dragon">Dragon</option>
                            <option value="dark">Dark</option>
                            <option value="steel">Steel</option>
                            <option value="fairy">Fairy</option>
                        </select>
                    </div>
                </div>
                <button className="btn_apply" onClick={applyFilter}>Aplicar</button>
                <button className="btn_close" onClick={ handleModalVisibility }>&times;</button>
            </div>
        </div>
    );
}