"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import MyGoogleMap from "@/components/googleMap/googleMap.component";
import { API, Sample, FileUpload } from "@/services/api";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SpinnerComponent from "@/components/spinner/spinner.component";
import XlsUploader from "@/components/xlsuploader/xlsuploader.component";
import TextInputField from "@/components/textinputfield/textinputfield.component";
import OtherOption from "@/components/otheroption/otheroption.component";
import CheckboxInput from "@/components/checkboxinput/checkboxinput.component";
import SmallLabel from "@/components/smalllabel/smalllabel.component";

const NewSampleSchema = Yup.object().shape({
  category: Yup.string().max(255, "Too Long!").required("Required"),
  sampleId: Yup.string().max(255, "Too Long!").required("Required"),
  collectorName: Yup.string().max(255, "Too Long!"),
  advisorOtherName: Yup.string().max(255, "Too Long!"),
  collectionYear: Yup.date(),
  collectionReasonOther: Yup.string().max(255, "Too Long!"),
  shortDescription: Yup.string().max(255, "Too Long!"),
  longDescription: Yup.string().max(255, "Too Long!").required("Required"),
  sampleFormOther: Yup.string().max(255, "Too Long!"),
  sampleTypeOther: Yup.string().max(255, "Too Long!"),
  storageBuildingOther: Yup.string().max(255, "Too Long!"),
  storageRoomOther: Yup.string().max(255, "Too Long!"),
  storageDetails: Yup.string().max(255, "Too Long!"),
  storageDuration: Yup.number(),
});

function isValidFileType(fileName: string): boolean {
  console.log("validating file name", fileName);
  if (fileName) {
    return fileName.endsWith(".xlsx");
  }
  return false;
}

const BatchUploadSchema = Yup.object().shape({
  file: Yup.mixed().test(
    "is-valid-type",
    "Not a valid file type, only xlsx format is allowed",
    (value: any) => {
      return isValidFileType(value && value.name.toLowerCase());
    }
  ),
});

export default function NewSample() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("id_token");

    token ? setAuth(true) : setAuth(false);
  }, []);

  const router = useRouter();
  if (!auth) {
    return (
      <div className="flex justify-center">
        You have to be logged in to view this page.
      </div>
    );
  }
  return (
    <div>
      <div>
        <h2 className="text-center mb-6 font-semibold text-2xl">
          New Sample Form / Batch Upload
        </h2>
      </div>
      <Formik
        validationSchema={BatchUploadSchema}
        initialValues={
          {
            // file: undefined,
          }
        }
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          actions.setStatus("submitting");
          if (values.file) {
            API.getPresignedUrl(values.file)
              .then((presignedURL) => {
                console.log("presigned url", presignedURL);
                if (values.file)
                  API.uploadFile(values.file, presignedURL)
                    .then(() =>
                      API.batchUpload(presignedURL)
                        .then((status) => {
                          // alert("success");
                          actions.setStatus("success");
                          actions.setSubmitting(false);
                          actions.resetForm();
                          router.push("/newsample/successupload");
                        })
                        .catch((error) => {
                          console.log(error);
                          alert("Batch Upload Error");
                          actions.setSubmitting(false);
                          actions.setStatus("error");
                        })
                    )
                    .catch((error) => {
                      alert("cannot upload file");
                      actions.setSubmitting(false);
                      actions.setStatus("error");
                    });
              })
              .catch((error) => {
                alert("cannot get presigned url");
                actions.setSubmitting(false);
                actions.setStatus("error");
              });
          }
        }}
      >
        {(props: FormikProps<FileUpload>) => {
          return (
            <Form>
              <fieldset className="fieldset-border">
                <fieldset className="fieldset-border">
                  <legend className="float-none w-auto text-xl">
                    Batch Upload
                  </legend>
                  <div className="flex items-center">
                    <a target="_blank" href="template-spreadsheet-format.xlsx">
                      <span
                        title="Download Template"
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          />
                        </svg>
                      </span>
                    </a>

                    <label className="mb-1 inline-block">
                      <XlsUploader />
                    </label>
                    {props.errors.file && props.values.file ? (
                      <div className="text-red-500">{props.errors.file}</div>
                    ) : null}
                    {props.isValid &&
                      props.values.file &&
                      !props.isSubmitting &&
                      props.status != "submitting" && (
                        <button
                          type="submit"
                          className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
                        >
                          SUBMIT
                        </button>
                      )}
                    {props.status === "submitting" && (
                      <div className="inline-block ml-6">
                        <SpinnerComponent />
                      </div>
                    )}
                  </div>
                </fieldset>
              </fieldset>
            </Form>
          );
        }}
      </Formik>

      <div className="grid">
        <div className="col-start-0 col-span-4 text-center">
          <hr className="h-px my-8 border-1 border-black dark:bg-gray-700"></hr>
        </div>
        <div className="col-start-5 col-span-1 text-center">
          <div className="flex w-full h-full items-center justify-center">
            <div>OR</div>
          </div>
        </div>
        <div className="col-start-6 col-span-4 text-center">
          <hr className="h-px my-8 border-1 border-black  dark:bg-gray-700"></hr>
        </div>
      </div>

      <p className="text-center text-sm mb-2">
        Please fill out the form to the best of your ability. The fields marked
        with an asterisk (*) are required to be completed.
      </p>

      <Formik
        initialValues={{
          category: "",
          sampleId: "",
          collectorName: "",
          advisorName: "",
          advisorOtherName: "",
          collectionYear: 2024,
          collectionReason: [],
          collectionReasonOther: "",
          collectionLocation: [],
          shortDescription: "",
          longDescription: "",
          sampleForm: [],
          sampleFormOther: "",
          sampleType: [],
          sampleTypeOther: "",
          sampleImg: "",
          storageBuilding: "",
          storageBuildingOther: "",
          storageRoom: "",
          storageRoomOther: "",
          storageDetails: "",
          storageDuration: 10,
        }}
        validationSchema={NewSampleSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          actions.setStatus("submitting");
          API.addSample(values)
            .then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
              router.push("/newsample/success");
            })
            .catch((error) => {
              console.log("==== error ", error);
              actions.setSubmitting(false);
              actions.setStatus("ERROR");
            });
        }}
      >
        {(props: FormikProps<Sample>) => {
          return (
            <Form>
              <fieldset className="fieldset-border">
                <fieldset className="fieldset-border">
                  <legend className="fieldset-legend-outer">
                    Sample Identification
                  </legend>
                  <div>
                    <label className="mb-1 block">
                      Is the sample entry for one or multiple bulk samples? *
                    </label>
                  </div>
                  <div>
                    <small className="font-thin text-sm block text-muted">
                      Please select one from the following.
                    </small>
                  </div>
                  {props.errors.category && props.touched.category ? (
                    <div className="text-red-500">{props.errors.category}</div>
                  ) : null}

                  <div>
                    <label htmlFor="category">
                      <Field
                        className="mb-2 mr-2"
                        type="radio"
                        name="category"
                        value="singleSpecimen"
                      />
                      Single Specimen
                    </label>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="category">
                      <Field
                        className="mb-2 mr-2"
                        type="radio"
                        name="category"
                        value="Collection"
                      />
                      Collection
                    </label>
                  </div>
                  <TextInputField
                    name="sampleId"
                    type="text"
                    placeholder="enter sample id..."
                    label={"Sample ID *"}
                    small="Sample ID may contain letters, numbers, and valid special
                    characters./,:-#_"
                  />
                </fieldset>
                <fieldset className="fieldset-border">
                  <legend className="fieldset-legend-inner">
                    Collector Info
                  </legend>
                  <TextInputField
                    name="collectorName"
                    type="text"
                    placeholder="Enter full name here..."
                    label={"Collector Name"}
                    small="Enter full name as first and last name. ex. John Doe"
                  />
                  <div className="mb-3">
                    <label className="inline-block" htmlFor="advisorName">
                      Advisor Last Name
                    </label>
                    <Field
                      name="advisorName"
                      type="text"
                      className="inline-input"
                      placeholder="Enter advisor last name here..."
                    />

                    <SmallLabel label="Enter last name of the advisor. ex. Smith" />
                  </div>
                  <TextInputField
                    name="collectionYear"
                    type="text"
                    placeholder="enter the year this sample was collected"
                    label={"Year Collected"}
                    small="Enter the year of when this sample was collected."
                  />

                  <div className="mb-3">
                    <div>
                      <label className="mb-1 block">
                        Purpose of Sample Collection
                      </label>
                    </div>
                    <div>
                      <SmallLabel label="Select all that apply." />
                    </div>
                    <div>
                      <CheckboxInput
                        name="collectionReason"
                        type={"checkbox"}
                        value={"teaching"}
                        label={"Teaching"}
                      />

                      <CheckboxInput
                        name="collectionReason"
                        type={"checkbox"}
                        value={"research"}
                        label={"Research"}
                      />

                      <CheckboxInput
                        name="collectionReason"
                        type={"checkbox"}
                        value={"other"}
                        label={"Other"}
                      />

                      {props.values.collectionReason &&
                        props.values.collectionReason.find(
                          (reason) => reason == "other"
                        ) === "other" && (
                          <OtherOption
                            name="collectionReasonOther"
                            label={"Other Purpose of Sample Collection"}
                            type={"text"}
                          />
                        )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="fieldset-border">
                  <legend className="fieldset-legend-inner">
                    Sample Collection Location
                  </legend>

                  <MyGoogleMap
                    mode="create"
                    setSamples={() => {}}
                    samples={[]}
                  />
                </fieldset>
                <fieldset className="fieldset-border">
                  <legend className="fieldset-legend-inner">
                    Sample Specs
                  </legend>
                  <TextInputField
                    name="shortDescription"
                    type="text"
                    placeholder="Enter geologic name of sample here..."
                    label={"Short Description"}
                    small="Enter a specific geologic name or a reference to the
                    sample. ex. quartz."
                  />

                  <div className="mb-3">
                    <div>
                      <label className="mb-1 block">Sample Form</label>
                    </div>
                    <div>
                      <SmallLabel label="Select all that apply." />
                    </div>
                    <div>
                      <CheckboxInput
                        name="sampleForm"
                        type={"checkbox"}
                        value={"handSample"}
                        label={"Hand Sample"}
                      />
                      <CheckboxInput
                        name="sampleForm"
                        type={"checkbox"}
                        value={"mineralSeparate"}
                        label={"Mineral Separate"}
                      />
                      <CheckboxInput
                        name="sampleForm"
                        type={"checkbox"}
                        value={"thinSection"}
                        label={"Thin Section"}
                      />
                      <CheckboxInput
                        name="sampleForm"
                        type={"checkbox"}
                        value={"other"}
                        label={"Other"}
                      />
                      {props.values.sampleForm &&
                        props.values.sampleForm.find(
                          (reason) => reason == "other"
                        ) === "other" && (
                          <OtherOption
                            name="sampleFormOther"
                            label={"Other Sample Form"}
                            type={"text"}
                          />
                        )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div>
                      <label className="mb-1 block">Sample Type</label>
                    </div>
                    <div>
                      <SmallLabel label="Select all that apply." />
                    </div>
                    <div>
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"rock"}
                        label={"Rock"}
                      />
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"mineral"}
                        label={"Mineral"}
                      />
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"fossil"}
                        label={"Fossil"}
                      />
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"soil"}
                        label={"Soil"}
                      />
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"water"}
                        label={"Water"}
                      />
                      <CheckboxInput
                        name="sampleType"
                        type={"checkbox"}
                        value={"other"}
                        label={"Other"}
                      />
                      {props.values.sampleType &&
                        props.values.sampleType.find(
                          (reason) => reason == "other"
                        ) === "other" && (
                          <OtherOption
                            name="sampleTypeOther"
                            label={"Other Sample Type"}
                            type={"text"}
                          />
                        )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="inline-block" htmlFor="longDescription">
                      Detailed Description *
                    </label>
                    <Field
                      name="longDescription"
                      component="textarea"
                      className="inline-input"
                      cols="3"
                      placeholder="Enter any additional storage details here..."
                    />
                  </div>
                </fieldset>

                <fieldset className="fieldset-border">
                  <legend className="fieldset-legend-inner">
                    Storage Details
                  </legend>
                  <div className="mb-3">
                    <label className="inline-block" htmlFor="storageBuilding">
                      Storage Building
                    </label>
                    <Field
                      name="storageBuilding"
                      as="select"
                      className="inline-input"
                    >
                      <option value="">Select</option>
                      <option value="PS">PS (Physical Science)</option>
                      <option value="CH">CH (Colonial Hall)</option>
                      <option value="Other">Other</option>
                    </Field>
                    <SmallLabel
                      label="From the dropdown, select which building this sample will
                      be stored in."
                    />
                  </div>
                  {props.values.storageBuilding === "Other" && (
                    <OtherOption
                      name="storageBuildingOther"
                      label={"Other Storage Building"}
                      type={"text"}
                    />
                  )}
                  <div className="mb-3">
                    <label className="inline-block" htmlFor="storageRoom">
                      Storage Room
                    </label>
                    <Field
                      name="storageRoom"
                      type="text"
                      className="inline-input"
                      placeholder="Enter storage room here..."
                    />

                    <SmallLabel label="Enter name or number of room ex. 222" />
                  </div>

                  <TextInputField
                    name="storageDetails"
                    type="textarea"
                    placeholder="Enter any additional storage details here"
                    label={"Additional Storage Details"}
                  />

                  <TextInputField
                    name="storageDuration"
                    type="text"
                    placeholder="Enter number of years this sample should be stored in dataase for."
                    label={"Storage Duration in years"}
                  />
                </fieldset>
                {!props.isValid && props.initialTouched && (
                  <div className="entry-error">CORRECT ERRORS</div>
                )}
                {props.status === "ERROR" && (
                  <div className="entry-error">Server Error</div>
                )}
                {props.status !== "submitting" && (
                  <div className="text-center mt-2">
                    <Link href="/">
                      <button
                        type="submit"
                        className="bg-tertiary-100 hover:bg-tertiary-200 text-white font-bold py-2 px-4 rounded"
                      >
                        CANCEL
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
                    >
                      SUBMIT
                    </button>
                    <button onClick={props.handleReset} className="ml-3">
                      Reset
                    </button>
                  </div>
                )}
                {props.status === "submitting" && (
                  <div className="flex justify-center mt-4">
                    <SpinnerComponent />
                  </div>
                )}
              </fieldset>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
