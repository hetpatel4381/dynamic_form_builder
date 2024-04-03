import React, { useState } from "react";
import InputFieldCustom from "./InputFieldCustom";
import RenderFormDropDown from "./RenderFormDropDown";

const DynamicFormBuilder = () => {
  const [forms, setForms] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [editMode, setEditMode] = useState([]);

  // State variables for field inputs
  const [fieldInputs, setFieldInputs] = useState([]);

  // Function to handle change in field input
  const handleFieldInputChange = (index, field, value) => {
    const updatedFieldInputs = [...fieldInputs];
    updatedFieldInputs[index][field] = value;
    setFieldInputs(updatedFieldInputs);
  };

  // Function to add a new form
  const addForm = () => {
    const fields = fieldInputs.map(({ label, type, options }) => ({
      label,
      type,
      options: options ? options.split(",").map((option) => option.trim()) : [],
    }));
    setForms([...forms, { fields }]);
    setEditMode([...editMode, false]);
    setFieldInputs([]);
  };

  // Function to remove a form
  const removeForm = (index) => {
    const updatedForms = forms.filter((_, i) => i !== index);
    setForms(updatedForms);
    const updatedEditMode = editMode.filter((_, i) => i !== index);
    setEditMode(updatedEditMode);
  };

  // Function to toggle edit mode for a form
  const toggleEditMode = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setEditMode(updatedEditMode);
  };
  

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">
        Build forms with Dynamic Form Builder
      </h2>
      <div className="mb-8">
        <label className="block mb-2">Number of Fields:</label>
        <input
          type="number"
          className="border px-3 py-2 w-full"
          onChange={(e) => {
            const count = parseInt(e.target.value);
            setFieldInputs(
              Array.from({ length: count }, () => ({
                label: "",
                type: "text",
                options: "",
              }))
            );
          }}
        />
      </div>
      {!editMode.some((bool)=> bool == true) && fieldInputs.length > 0 && (
        <div>
          {fieldInputs.map((field, index) => 
           <InputFieldCustom 
            field={field} 
            index={index}
            key={index}
            handleFieldInputChange={handleFieldInputChange}
            />
          )}
          <button
            onClick={addForm}
            className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Add Form
          </button>
        </div>
      )}
      {forms.length > 0 &&
        forms.map((form, index) => 
          <RenderFormDropDown
            key={index}
            form={form}
            index={index}
            editMode={editMode}
            removeForm={removeForm}
            setActiveForm={setActiveForm}
            activeForm={activeForm}
            setFieldInputs={setFieldInputs}
            handleFieldInputChange={handleFieldInputChange}
            toggleEditMode={toggleEditMode}
          />
        )}
    </div>
  );
};

export default DynamicFormBuilder;
