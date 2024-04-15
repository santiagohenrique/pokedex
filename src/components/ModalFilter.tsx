interface ModalFilterProps{
    handleModalVisibility: () => void;
}

export const ModalFilter = ( { handleModalVisibility }:ModalFilterProps ) => {
    return(
        <div className="modal">
            <div className="modal_container">
                    <p>&nbsp;</p>
                <input
                    type="text"
                    placeholder="Filtrar por nome"
                />
                <input
                    type="text"
                    placeholder="Filtrar por id"
                />
                <div>
                    <select>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="poison">Poison</option>
                    </select>
                </div>
                <button className="btn_close" onClick={ handleModalVisibility }>&times;</button>
            </div>
        </div>
    );
}