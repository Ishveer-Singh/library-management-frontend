function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-indigo-600
        text-white
        px-5
        py-2.5
        rounded-lg
        font-medium
        hover:bg-indigo-700
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
