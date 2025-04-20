function AddButton({ onAddClick }) {
return(
   <button onClick={onAddClick} className="fixed bottom-10 px-5 py-3 bg-blue-900 text-white right-10 rounded-full flex items-center justify-center hover:bg-blue-950 focus:ring-2 focus:ring-blue-500"><span className="text-2xl font-extrabold">+</span></button>

)
}

export default AddButton;