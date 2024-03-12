import { Field, useField } from "formik";

interface checkboxInput {
  name: string;
  label: String;
  value: String;
  type: String;
}

export default function CheckboxInput(props: checkboxInput) {
  const [field, meta] = useField(props.name);
  return (
    <label className="inline-block mr-2" htmlFor={props.name}>
      <Field
        className="mb-2 mr-2"
        type={props.type}
        name={props.name}
        value={props.value}
      />
      {props.label}
    </label>
  );
}
