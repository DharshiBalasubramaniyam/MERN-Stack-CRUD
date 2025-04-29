import { FaTrashAlt, FaPen, FaTimes, FaPlus } from 'react-icons/fa';
import CategoryForm from './CategoryForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CategoryService from '../services/CategoryService';

function CategoryWrapper({ onClose }) {

   const [isCategoryFormOpen, setCategoryFormOpen] = useState(false)
   const [editCategory, setEditCategory] = useState(null);
   const {deleteCategory} = CategoryService()

   const { categories } = useSelector(state => state.category)

   console.log(categories)

   const onEdit = (name) => {
      setEditCategory(name);
      setCategoryFormOpen(true)
   }

   const onDelete = async (name) => {
      await deleteCategory(name)
   }

   const onCancel = () => {
      setEditCategory(null);
      setCategoryFormOpen(false)
   }

   return (
      <div className="bg-white border-l w-full max-w-96 fixed top-0 right-0 h-screen p-2 flex flex-col z-50">

         <div className="flex items-center w-full mb-5">
            <h2 className="text-xl flex-1 text-blue-900 font-semi-bold">Manage Categories</h2>
            <button className="p-2 bg-transparent hover:bg-blue-200 rounded text-blue-900 border mr-2" onClick={() => setCategoryFormOpen(true)}>
               <FaPlus />
            </button>
            <button className="p-2 bg-transparent hover:bg-blue-200 rounded text-blue-900 border" onClick={onClose}>
               <FaTimes />
            </button>
         </div>

         <div className="flex-1 w-full overflow-y-scroll">
            {
               categories.map((cat) => {
                  return <CategoryItem name={cat} onEdit={onEdit} onDelete={onDelete} />
               })
            }
         </div>

         {isCategoryFormOpen && <CategoryForm onCancel={onCancel} editCategoryName={editCategory} />}

      </div>
   )

}

export default CategoryWrapper;


function CategoryItem({ name, onEdit, onDelete }) {
   return (
      <div key={name} className='flex items-center justify-between w-full p-2 mb-2 border hover:bg-gray-100'>
         <p className='flex-1 capitalize'>{name}</p>
         <p className='flex items-center *:p-2 *:rounded *:transition-all *:duration-100'>
            <span className='hover:bg-blue-100' onClick={() => onEdit(name)}>
               <FaPen size={15} color='purple' />
            </span>
            <span className='hover:bg-blue-100' onClick={() => onDelete(name)}>
               <FaTrashAlt size={15} color='red' />
            </span>
         </p>
      </div>
   )
}