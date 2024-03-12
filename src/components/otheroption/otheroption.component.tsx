import { Field, useField } from "formik";

interface otherOption {
  name: string;
  label: String;
  type: String;
}

export default function OtherOption(props: otherOption) {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-4">
      <label className="inline-block" htmlFor={props.name}>
        {props.label}
      </label>
      <Field className="inline-input" type={props.type} name={props.name} />
      {meta.error && meta.touched ? (
        <div className="text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
}
