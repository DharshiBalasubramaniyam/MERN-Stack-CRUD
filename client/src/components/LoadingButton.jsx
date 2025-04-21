import React from 'react';

function LoadingButton({ text }) {
   return (
      <button
         className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-900 hover:bg-blue-800 cursor-not-allowed opacity-50"
         disabled
      >
         <span
            style={{
               marginRight: '10px',
               border: '2px solid #fff',
               borderTop: '2px solid transparent',
               borderRadius: '50%',
               width: '16px',
               height: '16px',
               animation: 'spin 1s linear infinite',
            }}
         />
         {text}
      </button>
   );
}

export default LoadingButton;