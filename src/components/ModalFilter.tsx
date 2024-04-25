import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";
interface ModalFilterProps{
    handleModalVisibility: () => void;
    pokemonFilter: { name: string; type: string; };
    setPokemonFilter: Dispatch<SetStateAction<{ name: string; type: string; }>>;
}

export const ModalFilter = ( { handleModalVisibility, pokemonFilter, setPokemonFilter}:ModalFilterProps ) => {

    const [name, setName] = useState<string>(pokemonFilter.name);
    const [type, setType] = useState<string>(pokemonFilter.type);
    const types = [ 'fire', 'grass', 'water', 'electric', 
                    'normal', 'ice', 'fighting', 'poison', 'ground', 
                    'flying', 'psychic', 'bug', 'rock',
                    'ghost', 'dragon', 'dark', 'steel', 'fairy' ]

    const applyFilter = () => {
        const filteredName = name.replace(/\s/g, '').toLowerCase();
        setPokemonFilter({
            name: filteredName,
            type: type
        })
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
                <Button className="btn_apply" onClick={ applyFilter } text="Aplicar" />
                <Button className="btn_close" onClick={ handleModalVisibility } text="&times;" />
            </div>
        </div>
    );
}