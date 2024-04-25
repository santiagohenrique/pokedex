interface ButtonsProps{
    onClick: () => void,
    className: string,
    text: string
}

export const Button = ( { className, onClick, text }: ButtonsProps ) => {
    return(
        <button className={className} onClick={onClick}>{text}</button>
    );
}