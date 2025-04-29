// eslint-disable-next-line react/prop-types
function Input({ name, type, placeholder, value, maxLength, onChange }) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className="bg-transparent w-full p-3 my-3 rounded border border-blue-900 outline-none focus:border-primary focus:bg-transparent text-sm"
        />
    );
}

export default Input;
