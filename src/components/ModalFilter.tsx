interface ModalFilterProps{
    setModalVisibility: (visibility: boolean) => void;
}

export const ModalFilter = ( { setModalVisibility }:ModalFilterProps ) => {
    return(
        <div className="modal">
            <div className="modal_container">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias fugit sapiente, 
                    doloribus quis eveniet consectetur vitae voluptatem dolorem ratione veritatis vero dolores odio eligendi aperiam numquam quia at debitis. Enim.
                </p>
                <button className="btn_close" onClick={() => setModalVisibility(false)}>&times;</button>
            </div>
        </div>
    );
}