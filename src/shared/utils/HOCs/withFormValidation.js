import { useState } from "react";

const validateForm = (form, validationRules) => {
    const errors = {};
    for (const fieldName in validationRules) {
      const fieldValidations = validationRules[fieldName];
      for (const [validationFn, errorMsg] of fieldValidations) {
        if (!validationFn(form[fieldName])) {
          errors[fieldName] = errorMsg;
          break; // Break on the first validation failure for this field
        }
      }
    }
    return errors;
  };

const withFormValidation = (WrappedComponent, validationRules) => {
    return (props) => {
      const [form, setForm] = useState({ name: '', random: '' });
      const [errors, setErrors] = useState({});
  
      const handleChange = (name, value) => {
        const newForm = { ...form, [name]: value };
        const newErrors = validateForm(newForm, validationRules);
        setForm(newForm);
        setErrors(newErrors);
      };
  
      return (
        <WrappedComponent
          form={form}
          onChange={handleChange}
          onSubmit={props.onSubmit}
          errors={errors}
        />
      );
    };
  };

  export default withFormValidation;