"use client";
import { Formik, Form, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import MyGoogleMap from "@/components/googleMap/googleMap.component";
import Spinner from "@/components/spinner/spinner.component";
import {
  API,
  Sample,
  MapSearchLocationParams,
  SearchLocationParams,
} from "@/services/api";
import SampleCard from "@/components/samplecard/samplecard.component";
import Link from "next/link";
import * as Yup from "yup";

import SearchOptionButton from "@/components/searchoptionsbutton/searchoptionbutton.component";

const copySamples = (smpls: Sample[]): Sample[] => {
  return smpls.map((smpl) => {
    const copiedSample: Sample = { ...smpl };
    return copiedSample;
  });
};

const SearchMapValidationSchema = Yup.object().shape({
  locationRectangleBounds: Yup.object()
    .shape({
      Zh: Yup.object().shape({
        lo: Yup.number().required(),
        hi: Yup.number().required(),
      }),
      Jh: Yup.object().shape({
        lo: Yup.number().required(),
        hi: Yup.number().required(),
      }),
    })
    .required(),
});

export default function SearchMap() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [mapSamples, setMapSamples] = useState<Sample[]>([]);
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
      <div className="grid md:grid-cols-4 md:gap-4 pb-4">
        <div className="mb-4 md:mb-0 md:col-start-2 md:col-span-1 lg:hidden">
          <div className="text-end">
            <Link href="/search/filters">
              <SearchOptionButton text="Filter Search" />
            </Link>
          </div>
        </div>
        <div className="md:col-start-3 md:col-span-1 lg:hidden ">
          <div className="text-start">
            <Link href="/search/term">
              <SearchOptionButton text="Text Search" />
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center mb-6 font-semibold text-2xl">Map Search</h2>
      </div>
      <p className="text-center text-sm mb-2">
        Please use map rectangular control to select the area to search and
        click SEARCH button
      </p>

      <Formik
        validationSchema={SearchMapValidationSchema}
        initialValues={{}}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          setLoading(true);
          setError("");
          if (!init) {
            setInit(true);
          }
          let submitValues: SearchLocationParams = {};
          if (values.locationRectangleBounds) {
            submitValues = {
              locationRectangleBounds: {
                south: values.locationRectangleBounds?.Jh.lo,
                north: values.locationRectangleBounds?.Zh.hi,
                east: values.locationRectangleBounds?.Jh.hi,
                west: values.locationRectangleBounds?.Jh.lo,
              },
            };
            API.searchByLocation(submitValues)
              .then((response) => {
                setMapSamples(copySamples(response));
                setSamples(response);
                actions.setSubmitting(false);
                setLoading(false);
              })
              .catch(() => {
                actions.setSubmitting(false);
                setLoading(false);
                setError("server error");
              });
          }
        }}
      >
        {(props: FormikProps<MapSearchLocationParams>) => {
          return (
            <Form>
              <fieldset className="border border-black p-4">
                <legend className="float-none w-auto p-2  text-xl">
                  Sample Collection Location
                </legend>

                <MyGoogleMap
                  mode="search"
                  samples={mapSamples}
                  setSamples={setMapSamples}
                />
              </fieldset>
              <div className="text-center mt-2">
                <button
                  type="submit"
                  className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded"
                  disabled={props.isSubmitting}
                >
                  SEARCH
                </button>
              </div>
              {!props.isValid && props.initialTouched && (
                <div className="text-center mt-2 text-red-500">
                  Please select the area
                </div>
              )}
            </Form>
          );
        }}
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
                    context="/search/map/"
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
  );
}
