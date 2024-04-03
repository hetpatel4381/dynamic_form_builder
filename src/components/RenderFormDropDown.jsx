
import { BsChevronUp ,BsChevronDown} from "react-icons/bs"
import { RiEyeLine, RiPencilLine,RiDeleteBin6Line } from "react-icons/ri"
import RenderEditableForm from "./EditTableForm"
import RenderFormFields from "./RenderFormFields"
const RenderFormDropDown = ({form,index, editMode, removeForm, setActiveForm,toggleEditMode,activeForm, handleFieldInputChange, setFieldInputs}) => {
     const isOpen = activeForm === index;
     const isEditMode = editMode[index];
     return (
       <div key={index} className="border p-4 mb-4">
         <div className="flex justify-between items-center">
           <h3 className="text-lg font-semibold mb-2">
             Form {index + 1}:
             {isOpen ? (
               <BsChevronUp
                 className="text-gray-500 cursor-pointer ml-2"
                 onClick={() => setActiveForm(null)}
               />
             ) : (
               <BsChevronDown
                 className="text-gray-500 cursor-pointer ml-2"
                 onClick={() => setActiveForm(index)}
               />
             )}
           </h3>
           <div>
             <RiEyeLine
               className={`text-blue-500 cursor-pointer mr-2 ${
                 isEditMode ? "hidden" : ""
               }`}
               onClick={() => setActiveForm(index)}
             />
             <RiPencilLine
               className={`text-green-500 cursor-pointer mr-2 ${
                 isEditMode ? "hidden" : ""
               }`}
               onClick={() => {
                 toggleEditMode(index)
                 setFieldInputs([...form.fields])
               }}
             />
             <RiDeleteBin6Line
               className={`text-red-500 cursor-pointer ${
                 isEditMode ? "hidden" : ""
               }`}
               onClick={() => removeForm(index)}
             />
           </div>
         </div>
         {isOpen &&
           (isEditMode
             ? <RenderEditableForm
               form={form}
               index= {index}
               toggleEditMode={toggleEditMode}
               handleFieldInputChange={handleFieldInputChange}
             />
             : <RenderFormFields
                 form={form}
                 index={index}
               />
           )}
       </div>
     );
}

export default RenderFormDropDown
