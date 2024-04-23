import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
interface ModalFilterProps{
    handleModalVisibility: () => void;
    setPokemonFilteredName: Dispatch<SetStateAction<string>>
    setPokemonFilteredType: Dispatch<SetStateAction<string>>
}

export const ModalFilter = ( { handleModalVisibility, setPokemonFilteredName, setPokemonFilteredType }:ModalFilterProps ) => {

    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');
    const types = [ 'fire', 'grass', 'water', 'electric', 
                    'normal', 'ice', 'fighting', 'poison', 'ground', 
                    'flying', 'psychic', 'bug', 'rock',
                    'ghost', 'dragon', 'dark', 'steel', 'fairy' ]

    const applyFilter = () => {
        const filteredName = name.replace(/\s/g, '').toLowerCase();
        setPokemonFilteredName(filteredName)
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
                            {types.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="btn_apply" onClick={applyFilter}>Aplicar</button>
                <button className="btn_close" onClick={ handleModalVisibility }>&times;</button>
            </div>
        </div>
    );
}