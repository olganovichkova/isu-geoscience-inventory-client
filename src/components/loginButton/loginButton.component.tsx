import Link from "next/link";

const authUrl = process.env.NEXT_PUBLIC_COGNITO_AUTH_URL;

export default function LoginButton(): JSX.Element {
  return (
    <div className="flex justify-end">
      <div className="">
        <Link href={authUrl!}>
          <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
            <span className="">
              Admin Login
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 hidden md:inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
