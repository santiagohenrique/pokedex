import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
interface ModalFilterProps{
    handleModalVisibility: () => void;
    setPokemonFilteredName: Dispatch<SetStateAction<string>>
}

export const ModalFilter = ( { handleModalVisibility, setPokemonFilteredName }:ModalFilterProps ) => {

    const [name, setName] = useState<string>('');

    const applyFilter = () => {
        setPokemonFilteredName(name)
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
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="select_container">
                        <span>Selecione um tipo</span>
                        <select>
                            <option value="">Todos os tipos</option>
                            <option value="fire">Fire</option>
                            <option value="water">Water</option>
                            <option value="poison">Poison</option>
                        </select>
                    </div>
                </div>
                <button className="btn_apply" onClick={applyFilter}>Aplicar</button>
                <button className="btn_close" onClick={ handleModalVisibility }>&times;</button>
            </div>
        </div>
    );
}