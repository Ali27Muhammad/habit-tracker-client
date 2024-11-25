export default function TextareaField({ label, id, value, onChange, placeholder, rows = 4 }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          {label}
        </label>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          rows={rows}
        ></textarea>
      </div>
    );
  }
  