"use client";
import Link from "next/link";
import { Sample } from "../../services/api";
import IconButton from "@/components/iconbutton/iconbutton.component";
import { useState } from "react";
import ConfirmDialog from "@/components/confirmdialog/confirmdialog.component";
import { LABELS } from "@/utils/labels";
import DeleteIcon from "../deleteicon/deleteicon.component";

type SamplCardProp = {
  sample: Sample;
  onDelete: (id: number) => void;
  context: string;
  auth: boolean;
};

export default function SampleCard({
  sample,
  onDelete,
  context,
  auth,
}: SamplCardProp) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="mb-0.5 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 ">
      <div className="flex items-stretch">
        <div className="basis-full">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="">
              <img
                className="object-cover w-full rounded-t-lg hidden md:block h-10 md:h-auto md:w-32 md:rounded-none md:rounded-s-lg"
                src="/sample_image.jpg"
                alt=""
              />
            </div>
            <div className="basis-full">
              <div className="flex flex-col justify-end h-full p-3">
                <div className="flex-1">
                  <div className="basis-full">
                    <div className="flex justify-between">
                      <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          <span className="font-thin">ID: </span>
                          <span>{sample.sampleId}</span>
                        </h5>
                      </div>
                      <div>
                        <div className="w-18 h-18">
                          <div className="relative">
                            {auth && (
                              <span className="absolute top-0 right-0">
                                <IconButton
                                  onClick={() => setConfirmOpen(true)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </span>
                            )}

                            <ConfirmDialog
                              title={`Delete sample [${sample.id}]`}
                              open={confirmOpen}
                              onClose={() => setConfirmOpen(false)}
                              onConfirm={() => {
                                console.log(
                                  "about to delete the item",
                                  sample.id
                                );
                                if (sample.id) return onDelete(sample.id);
                                return;
                              }}
                            >
                              <div className="bg-gray-100 p-4">
                                <div className="font-medium text-black-900">
                                  Warning: this action cannot be undone.
                                </div>
                                <span className="flex items-center text-red-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 mr-1"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>

                                  <div className="text-sm">
                                    All references to this sample will be
                                    erased.
                                  </div>
                                </span>
                                <span className="flex items-center text-red-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4 mr-1"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                  <div className="text-sm">
                                    This sample will be deleted from the
                                    database.
                                  </div>
                                </span>
                              </div>
                            </ConfirmDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-full">
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                      <span className="font-thin">Category: </span>
                      <span>{LABELS[sample.category]}</span>
                    </p>
                  </div>
                </div>
                <div className="">
                  <div className="basis-full">
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 m-2"></hr>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <span className="font-thin">Description: </span>
                        <span>{sample.longDescription}</span>
                      </p>
                    </div>
                    <div>
                      <Link href={`${context}${sample.id}`}>
                        <button
                          type="button"
                          className="w-full bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-1 px-2 md:rounded"
                        >
                          DETAIL
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
