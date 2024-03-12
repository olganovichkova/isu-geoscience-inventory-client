"use client";
import { Field, Formik, Form, FormikProps } from "formik";
import SampleCard from "@/components/samplecard/samplecard.component";
import { useState } from "react";
import { Sample, API, SearchFilterParams } from "@/services/api";
import Link from "next/link";
import SpinnerComponent from "@/components/spinner/spinner.component";
import SearchOptionButton from "@/components/searchoptionsbutton/searchoptionbutton.component";
import PlusSignToggler from "@/components/plussigntoggler/plussigntoggler.component";

export default function FilterSearch() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  const [toggleCollector, setToggleCollector] = useState<boolean>(false);
  const [toggleAdvisor, setToggleAdvisor] = useState<boolean>(false);
  const [toggleYear, setToggleYear] = useState<boolean>(false);
  const [toggleReason, setToggleReason] = useState<boolean>(false);
  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [toggleType, setToggleType] = useState<boolean>(false);
  const [toggleBuidling, setToggleBuilding] = useState<boolean>(false);
  const [toggleRoom, setToggleRoom] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(false);
  const [error, setError] = useState<string>("");

  const handleOnDelete = (id: number) => {
    setError("");
    API.deleteSample(id)
      .then(() => {
        alert("successfully deleted");
        //need to update samples
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
    <div className="flex flex-col">
      <div className="items-center justify-between">
        <div className="card hover:shadow-lg">
          <div className="card-body overflow-x-auto">
            {/* search links */}
            <div className="flex justify-between md:justify-center mb-3 lg:hidden">
              <div>
                <div className="md:ml-2 md:mr-2 ">
                  <Link href="/search/map">
                    <SearchOptionButton text="Map Search" />
                  </Link>
                </div>
              </div>
              <div>
                <Link href="/search/term">
                  <SearchOptionButton text="Text Search" />
                </Link>
              </div>
            </div>
            {/* search title */}
            <div className="flex justify-center w-full">
              <div className="w-full">
                <h1 className="text-center font-bold text-lg px-4 shadow-md mb-3">
                  Advanced Filter Search
                </h1>
              </div>
            </div>

            {/* search filter and search results container */}
            <div className="flex flex-col md:flex-row">
              {/* filters */}
              <div>
                <div className="min-w-80 rounded m-2">
                  <div className="flex flex-col">
                    <Formik
                      initialValues={{
                        category: "",
                        collectorName: "",
                        advisorName: "",
                        collectionYear: "",
                        collectionReason: "",
                        sampleForm: "",
                        sampleType: "",
                        storageBuilding: "",
                        storageRoom: "",
                      }}
                      onSubmit={async (values, actions) => {
                        console.log(values);
                        actions.setSubmitting(true);
                        setLoading(true);
                        setError("");
                        if (!init) {
                          setInit(true);
                        }
                        API.searchByFilter(values)
                          .then((result) => {
                            setSamples(result);
                            actions.setSubmitting(false);
                            setLoading(false);
                          })
                          .catch((error) => {
                            actions.setSubmitting(false);
                            setLoading(false);
                            setError("server error");
                          });
                      }}
                    >
                      {(props: FormikProps<SearchFilterParams>) => (
                        <Form>
                          <div className="flex justify-between items-center shadow-sm">
                            <div className="font-bold py-2 px-4">filters</div>
                            <div>
                              <button
                                onClick={props.handleReset}
                                className="ml-3 border rounded justify-self-end"
                              >
                                Reset
                              </button>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleCategory}
                                setToggle={setToggleCategory}
                                label="Category"
                              />

                              {toggleCategory && (
                                <Field
                                  name="category"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">select category</option>
                                  <option value="singleSpecimen">
                                    Single Specimen
                                  </option>
                                  <option value="collection">Collection</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleYear}
                                setToggle={setToggleYear}
                                label="Year"
                              />
                              {toggleYear && (
                                <Field
                                  type="text"
                                  name="collectionYear"
                                  placeholder="collection year"
                                  className="filter-field"
                                />
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleCollector}
                                setToggle={setToggleCollector}
                                label="Collector"
                              />
                              {toggleCollector && (
                                <Field
                                  type="text"
                                  name="collectorName"
                                  placeholder="collector name"
                                  className="filter-field"
                                />
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleAdvisor}
                                setToggle={setToggleAdvisor}
                                label="Advisor"
                              />
                              {toggleAdvisor && (
                                <Field
                                  name="advisorName"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">select advisor name</option>
                                  <option value="Ben">Ben</option>
                                  <option value="Dave">Dave</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleReason}
                                setToggle={setToggleReason}
                                label="Reason"
                              />
                              {toggleReason && (
                                <Field
                                  name="collectionReason"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">
                                    select collection reason
                                  </option>
                                  <option value="teaching">Teaching</option>
                                  <option value="research">Research</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleForm}
                                setToggle={setToggleForm}
                                label="Form"
                              />
                              {toggleForm && (
                                <Field
                                  name="sampleForm"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">select sample form</option>
                                  <option value="handSample">
                                    Hand Sample
                                  </option>
                                  <option value="mineralSeparate">
                                    Mineral Separate
                                  </option>
                                  <option value="thinSection">
                                    Thin Section
                                  </option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleType}
                                setToggle={setToggleType}
                                label="Type"
                              />
                              {toggleType && (
                                <Field
                                  name="sampleType"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">select sample type</option>
                                  <option value="rock">Rock</option>
                                  <option value="mineral">Mineral</option>
                                  <option value="fossil">Fossil</option>
                                  <option value="soil">Soil</option>
                                  <option value="water">Water</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleBuidling}
                                setToggle={setToggleBuilding}
                                label="Building"
                              />
                              {toggleBuidling && (
                                <Field
                                  name="storageBuilding"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">
                                    select storage building
                                  </option>
                                  <option value="PS">
                                    PS (Physical Science)
                                  </option>
                                  <option value="CH">CH (Colonial Hall)</option>
                                </Field>
                              )}
                            </div>
                            <div className="px-2 py-2">
                              <PlusSignToggler
                                toggle={toggleRoom}
                                setToggle={setToggleRoom}
                                label="Room"
                              />
                              {toggleRoom && (
                                <Field
                                  name="storageRoom"
                                  as="select"
                                  className="filter-field"
                                >
                                  <option value="">select storage room</option>
                                  <option value="room1">Room #1</option>
                                  <option value="room2">Room #2</option>
                                  <option value="room3">Room #3</option>
                                </Field>
                              )}
                            </div>
                          </div>
                          <div className="py-2">
                            <button type="submit" className="submit-search-btn">
                              Search
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              {/* result set */}
              <div className="md:flex-grow background-filter rounded ml-2">
                <div className="flex flex-col w-full justify-center items-ceneter">
                  {init && (
                    <div className="">
                      <div className="mx-6 mt-4 mb-4 text-center">
                        Search Results
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div className="">
                      <div className="flex justify-center items center">
                        <div>
                          <SpinnerComponent />
                        </div>
                      </div>
                    </div>
                  )}
                  {!loading && (
                    <div className="mx-1">
                      {samples.length > 0 &&
                        samples.map((sample) => (
                          <div key={sample.id}>
                            <SampleCard
                              sample={sample}
                              onDelete={handleOnDelete}
                              context="/search/filters/"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                  {!loading && samples.length === 0 && init && !error && (
                    <div className="text-center">No Results Found</div>
                  )}
                  {!loading && samples.length === 0 && init && error && (
                    <div className="text-center text-red-500">{error}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
