import React, { useState } from "react";
import { RiEyeLine, RiPencilLine, RiDeleteBin6Line } from "react-icons/ri";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

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

  // Function to render form fields
  const renderFormFields = (form, index) => {
    return form.fields.map((field, fieldIndex) => (
      <div key={fieldIndex} className="mb-4">
        <label className="block mb-2">{field.label}</label>
        {field.type === "select" ? (
          <select className="border px-3 py-2 w-full">
            {field.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === "radio" ? (
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
    ));
  };

  // Function to render accordion for each form
  const renderFormAccordion = (form, index) => {
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
              onClick={() => toggleEditMode(index)}
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
            ? renderEditableForm(form, index)
            : renderFormFields(form, index))}
      </div>
    );
  };

  // Function to render editable form fields
  const renderEditableForm = (form, index) => {
    return (
      <form>
        {form.fields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            <input
              type={field.type}
              placeholder={field.label}
              className="border px-3 py-2 w-full"
            />
          </div>
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
      {fieldInputs.length > 0 && (
        <div>
          {fieldInputs.map((field, index) => (
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
          ))}
          <button
            onClick={addForm}
            className="bg-blue-500 text-white px-4 py-2 rounded inline-block"
          >
            Add Form
          </button>
        </div>
      )}
      {forms.length > 0 &&
        forms.map((form, index) => renderFormAccordion(form, index))}
    </div>
  );
};

export default DynamicFormBuilder;
