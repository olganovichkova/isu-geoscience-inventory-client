import { useField, Field } from "formik";

interface TextInput {
  name: string;
  label: string;
  placeholder: string;
  small?: string;
  type?: string;
  rows?: string;
  component?: string;
}

export default function TextInputField(props: TextInput) {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-3">
      <label className="inline-block" htmlFor={props.name}>
        {props.label}
      </label>
      <input {...field} className="inline-input" {...props} />
      {!meta.value && meta.touched ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
      <small className="font-thin text-sm block text-muted">
        {props.small}
      </small>
    </div>
  );
}
