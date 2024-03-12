"use client";
import LoginButton from "@/components/loginButton/loginButton.component";
import LogoutButton from "@/components/logoutButton/logoutButton.component";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const searchParams = useSearchParams();
  const accessCode = searchParams.get("code");

  useEffect(() => {
    const token = sessionStorage.getItem("id_token");

    token ? setAuth(true) : setAuth(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("id_token");
    setAuth(false);
  };

  console.log(auth);

  return (
    <>
      <main className="flex min-h-screen flex-col ">
        <div className="basis-1/12 items-center justify-between pt-2 pl-8 pr-8 sm:pt-4 sm:pl-16 sm:pr-16">
          <div className="grid md:grid-cols-6 md:gap-4">
            <div className="col-start-0 col-span-12 md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-4">
              {!auth && <LoginButton />}
              {auth && <LogoutButton onLogout={handleLogout} />}
            </div>
          </div>
        </div>

        <div className="basis-11/12 items-center justify-between pt-2 pl-8 pr-8 pb-8 sm:pt-4 sm:pl-16 sm:pr-16 sm:pb-16">
          <div className="grid md:grid-cols-6 md:gap-4">
            <div className="col-start-0 col-span-12 md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-4">
              <div className="card hover:shadow-lg">
                <h2 className="card-title">Geoscience Sample Database</h2>
                <div className="card-body">
                  <p className="card-text">
                    Welcome to the geoscience sample database. This database was
                    created to help staff and students find, search, and
                    organize the entire rock collection/inventory here at Idaho
                    State University. To continue, please make a selection from
                    one of the following options.
                  </p>
                  <div className="m-6">
                    <div className="grid md:grid-cols-6 md:gap-4">
                      <div className="mb-4 md:mb-0 md:col-start-1 md:col-span-3 lg:col-start-1 lg:col-span-3">
                        <div className="text-center">
                          <Link href="/search/term">
                            <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
                              <div className="">
                                <span className="">Search the Database </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="100"
                                  height="100"
                                  viewBox="0 0 30 30"
                                  className="w-4 h-4 hidden md:inline-block"
                                >
                                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                                </svg>
                              </div>
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="md:col-start-4 md:col-span-3 lg:col-start-4 lg:col-span-3">
                        <div className="text-center">
                          <Link href="/newsample">
                            <button className="new-entry-btn" disabled={!auth}>
                              <div className="">
                                <span className="">
                                  New Entry Form / Batch Upload
                                </span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0px"
                                  y="0px"
                                  width="100"
                                  height="100"
                                  viewBox="0 0 32 32"
                                  className="w-4 h-4 hidden md:inline-block"
                                >
                                  <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
                                </svg>
                              </div>
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
      </main>
    </>
  );
}
