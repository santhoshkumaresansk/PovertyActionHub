const Button = ({ text, onClick, className }) => {
    return (
        <button 
            onClick={onClick} 
            className={`px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
