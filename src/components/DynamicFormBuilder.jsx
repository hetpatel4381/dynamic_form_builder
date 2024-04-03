import React, { useState } from "react";

const DynamicFormBuilder = () => {
  const [forms, setForms] = useState([]);

  // Function to add a new form
  const addForm = () => {
    setForms([...forms, { fields: [] }]);
  };

  // Function to add a field to a form
  const addField = (formIndex, label, type, options) => {
    const newField = { label, type, options };
    const updatedForms = [...forms];
    updatedForms[formIndex].fields.push(newField);
    setForms(updatedForms);
  };

  // Function to remove a form
  const removeForm = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };

  // Function to remove a field from a form
  const removeField = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].fields.splice(fieldIndex, 1);
    setForms(updatedForms);
  };

  // Function to render form fields
  const renderFormFields = (formIndex) => {
    return forms[formIndex].fields.map((field, index) => (
      <div key={index} className="mb-4">
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
        <button
          onClick={() => removeField(formIndex, index)}
          className="bg-red-500 text-white px-3 py-2 mt-2 rounded inline-block mr-2"
        >
          Remove Field
        </button>
      </div>
    ));
  };

  // Function to render forms
  const renderForms = () => {
    return forms.map((form, index) => (
      <div key={index} className="border p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Form {index + 1}:</h3>
        <form>{renderFormFields(index)}</form>
        <button
          onClick={() => removeForm(index)}
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded inline-block mr-2"
        >
          Remove Form
        </button>
        <div className="mt-4">
          <label htmlFor={`label_${index}`} className="block mb-2">
            Label:
          </label>
          <input
            type="text"
            id={`label_${index}`}
            className="border px-3 py-2 w-full mb-2"
          />
          <label htmlFor={`type_${index}`} className="block mb-2">
            Type:
          </label>
          <select
            id={`type_${index}`}
            className="border px-3 py-2 w-full mb-2"
            onChange={(e) => {
              const selectedType = e.target.value;
              const optionsSection = document.getElementById(
                `options_${index}`
              );
              optionsSection.style.display =
                selectedType === "select" || selectedType === "radio"
                  ? "block"
                  : "none";
            }}
          >
            <option value="name">Name</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="password">Password</option>
            <option value="select">Select</option>
            <option value="radio">Radio</option>
            <option value="range">Range</option>
          </select>
          <div id={`options_${index}`} style={{ display: "none" }}>
            <label htmlFor={`options_input_${index}`} className="block mb-2">
              Options:
            </label>
            <input
              type="text"
              id={`options_input_${index}`}
              className="border px-3 py-2 w-full mb-2"
            />
          </div>
          <button
            onClick={() => {
              const label = document.getElementById(`label_${index}`).value;
              const type = document.getElementById(`type_${index}`).value;
              const optionsInput = document.getElementById(
                `options_input_${index}`
              );
              const options =
                optionsInput && optionsInput.value
                  ? optionsInput.value.split(",").map((option) => option.trim())
                  : [];
              addField(index, label, type, options);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded inline-block"
          >
            Add Field
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">
        Build forms with Dynamic Form Builder
      </h2>
      <button
        onClick={addForm}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-8 inline-block"
      >
        Create Form
      </button>
      {forms.length > 0 && renderForms()}
    </div>
  );
};

export default DynamicFormBuilder;
