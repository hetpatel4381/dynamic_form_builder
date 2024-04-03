import InputFieldCustom from "./InputFieldCustom";
const RenderEditableForm = ({form, index, handleFieldInputChange, toggleEditMode}) => {

     return (
          <form>
               {form.fields.map((field, index) => (
                    <InputFieldCustom 
                         field={field} 
                         index= {index}
                         key={index}
                         handleFieldInputChange={handleFieldInputChange}
                    />
               ))}
               <button className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
                    Save
               </button>
               <button
                    className="bg-gray-500 text-white px-4 py-2 rounded inline-block ml-4"
                    onClick={() => toggleEditMode(index)}
               >
                    Cancel
               </button>
          </form>
     );
};
export default RenderEditableForm