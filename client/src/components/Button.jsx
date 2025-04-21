// eslint-disable-next-line react/prop-types
function Button({ text, type, onClick }) {
    return (
        <button
            type={type ?? "button"}
            onClick={onClick}
            className="bg-blue-900 w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white hover:bg-blue-800 focus:outline-none active:scale-98"
        >
            {text}
        </button>
    )
}

export default Button;
