"use client";
import {
  Field,
  Formik,
  Form,
  FormikProps,
  useFormikContext,
  useField,
} from "formik";
import SampleCard from "@/components/samplecard/samplecard.component";
import Spinner from "@/components/spinner/spinner.component";
import { useEffect, useState } from "react";
import samplesMock from "../../../mock/results.json";
import { Sample, API, SearchFulltextParams } from "@/services/api";
import Link from "next/link";
import SearchOptionButton from "@/components/searchoptionsbutton/searchoptionbutton.component";

export default function SearchTerm() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [error, setError] = useState<string>("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("id_token");

    token ? setAuth(true) : setAuth(false);
  }, []);

  const handleOnDelete = (id: number) => {
    setError("");
    API.deleteSample(id)
      .then(() => {
        alert("successfully deleted");
        let newSamples = samples.reduce((acc: Sample[], smpl: Sample) => {
          const copySmpl = { ...smpl };
          if (smpl.id !== id) {
            acc.push(copySmpl);
          }
          return acc;
        }, []);
        setSamples(newSamples);
      })
      .catch((error) => setError(error));
  };

  return (
    <div>
      <div className="grid md:grid-cols-6 md:gap-4">
        <div className="mb-4 md:mb-0 md:col-start-3 md:col-span-1 lg:hidden ">
          <div className="text-end">
            <Link href="/search/filters">
              <SearchOptionButton text="Filter Search" />
            </Link>
          </div>
        </div>
        <div className="md:col-start-4 md:col-span-1 lg:hidden ">
          <div className="text-start">
            <Link href="/search/map">
              <SearchOptionButton text="Map Search" />
            </Link>
          </div>
        </div>
        <div className="col-start-1 col-span-6 lg:col-start-2 lg:col-span-4">
          <h1 className="text-center font-bold text-lg px-6 pt-4 pb-6">
            Search Inventory
          </h1>
        </div>
        <div className="col-start-1 col-span-6 md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-4">
          <Formik
            initialValues={{
              searchterm: "",
            }}
            onSubmit={async (values, actions) => {
              console.log(values);
              actions.setSubmitting(true);
              setLoading(true);
              if (!init) {
                setInit(true);
              }
              setError("");
              API.searchByText(values)
                .then((result) => {
                  setSamples(result);
                  actions.setSubmitting(false);
                  setLoading(false);
                })
                .catch(() => {
                  actions.setSubmitting(false);
                  setLoading(false);
                  setError("server error");
                });
            }}
          >
            {(props: FormikProps<SearchFulltextParams>) => (
              <Form>
                <div className="grid md:grid-cols-6 md:gap-1">
                  <div className="col-start-1 col-span-5">
                    <Field
                      type="text"
                      id="searchterm"
                      name="searchterm"
                      placeholder="Enter keyword or phrase to search by..."
                      className="filter-field"
                    />
                    <small>Note: separate each word with a space.</small>
                  </div>
                  <div className="col-start-6 col-span-1">
                    <button type="submit" className="submit-search-btn">
                      SEARCH
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="grid">
            {init && (
              <div className="col-start-1 col-span-12">
                <div className="m-6 text-center">Search Results</div>
              </div>
            )}
            {loading && (
              <div className="col-start-7">
                <Spinner />
              </div>
            )}
            {!loading && (
              <div className="col-start-1 col-span-12">
                {samples.length > 0 &&
                  samples.map((sample) => (
                    <div key={sample.id}>
                      <SampleCard
                        sample={sample}
                        onDelete={handleOnDelete}
                        context="/search/term/"
                        auth={auth}
                      />
                    </div>
                  ))}
              </div>
            )}
            {!loading && samples.length === 0 && init && !error && (
              <div className="col-start-1 col-span-12">
                <div className="text-center">No Results Found</div>
              </div>
            )}
            {!loading && samples.length === 0 && init && error && (
              <div className="col-start-1 col-span-12">
                <div className="text-center text-red-500">{error}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
