

const RenderForm = ({field}) => {
  return (
     <div className="mb-4">
          <label className="block mb-2">{field.label}</label>
          {field.type === "select" ? (
          <select className="border px-3 py-2 w-full">
          {field.options.map((option, optionIndex) => (
               <option key={optionIndex} value={option}>
               {option}
               </option>
          ))}
          </select>
          ) 
          : 
          field.type === "radio" ? (
          field.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center mb-2">
               <input
                    type="radio"
                    id={`${field.label}_${option}`}
                    name={field.label}
                    value={option}
               />
               <label htmlFor={`${field.label}_${option}`} className="ml-2">
                    {option}
               </label>
          </div>
          ))
          ) : (
          <input
               type={field.type}
               placeholder={field.label}
               className="border px-3 py-2 w-full"
          />
          )}
     </div>
  )
}

export default RenderForm
