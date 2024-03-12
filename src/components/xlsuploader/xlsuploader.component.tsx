"use client";
import { useFormikContext } from "formik";

export default function Home() {
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFieldValue("file", file);
    //setFieldTouched("file", true); commented out because it is causing second rerender and changes the value of the file to be undefined
  };

  return (
    <div>
      <div>
        <input type="file" name="qq" onChange={handleFileChange} />
      </div>
    </div>
  );
}
