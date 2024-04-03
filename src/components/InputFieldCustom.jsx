
const InputFieldCustom = ({field, index, handleFieldInputChange}) => {
  return (
    <div key={index} className="mb-4">
      <label className="block mb-2">{`Field ${index + 1}`}</label>
      <input
        type="text"
        className="border px-3 py-2 w-full mb-2"
        placeholder="Label"
        value={field.label}
        onChange={(e) =>
          handleFieldInputChange(index, "label", e.target.value)
        }
      />
      <select
        className="border px-3 py-2 w-full mb-2"
        value={field.type}
        onChange={(e) =>
          handleFieldInputChange(index, "type", e.target.value)
        }
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="email">Email</option>
        <option value="password">Password</option>
        <option value="select">Select</option>
        <option value="radio">Radio</option>
      </select>
      {(field.type === "select" || field.type === "radio") && (
        <input
          type="text"
          className="border px-3 py-2 w-full mb-2"
          placeholder="Options (comma-separated)"
          value={field.options}
          onChange={(e) =>
            handleFieldInputChange(index, "options", e.target.value)
          }
        />
      )}
    </div>
  )
}      
export default InputFieldCustom
