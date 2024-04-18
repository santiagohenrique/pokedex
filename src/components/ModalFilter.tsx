import { useState } from "react";
interface ModalFilterProps{
    handleModalVisibility: () => void;
}


export const ModalFilter = ( { handleModalVisibility }:ModalFilterProps ) => {

    const [name, setName] = useState('');

    return(
        <div className="modal">
            <div className="modal_container">
                    <p>&nbsp;</p>
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    <select>
                        <option value="">Todos os tipos</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="poison">Poison</option>
                    </select>
                </div>
                <button>Aplicar filtros</button>
                <button className="btn_close" onClick={ handleModalVisibility }>&times;</button>
            </div>
        </div>
    );
}