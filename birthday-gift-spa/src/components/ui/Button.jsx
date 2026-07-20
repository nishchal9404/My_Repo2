import React from 'react';

const Button = ({ text, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-[#be0b33] text-white rounded-full py-2 px-4 transition-all duration-500 ease-in-out ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;