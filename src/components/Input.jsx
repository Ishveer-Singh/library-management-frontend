function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  className=""
}) {
  return (
    <div className="flex flex-col gap-2">

      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200  ${className}`}
      />
    </div>
  );
}

export default Input;