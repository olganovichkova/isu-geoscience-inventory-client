import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar(prop: { token: string | null }) {
  const [showOption, setShowOption] = useState(false);
  useEffect(() => {
    prop.token ? setShowOption(true) : setShowOption(false);
  }, []);
  return (
    <div>
      {" "}
      <div className="sticky top-0 w-full z-50 bg-zinc-950">
        <div className="flex justify-between">
          <div>
            <Link href="/" className="">
              <div className="p-3">
                <img src="/Bengal.png" className="h-10"></img>
              </div>
            </Link>
          </div>
          <div className="text-white w-full hidden lg:block">
            <div className="flex justify-end items-center h-full">
              <div className="mr-5 cursor-pointer hover:text-lg w-40 text-center">
                <Link href="/">HOME</Link>
              </div>
              <div className="mr-5 cursor-pointer hover:text-lg w-40 text-center">
                <Link href="/search/filters">FILTER SEARCH</Link>
              </div>
              <div className="mr-5 cursor-pointer hover:text-lg w-40 text-center">
                <Link href="/search/map">MAP SEARCH</Link>
              </div>
              <div className="mr-5 cursor-pointer hover:text-lg w-40 text-center">
                <Link href="/search/term">TEXT SEARCH</Link>
              </div>
              {showOption && (
                <div className="mr-5 cursor-pointer hover:text-lg w-52 text-center">
                  <Link href="/newsample">NEW SAMPLE / UPLOAD</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
