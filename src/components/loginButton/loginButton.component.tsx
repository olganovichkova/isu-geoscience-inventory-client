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
                x="0px"
                y="0px"
                width="120"
                height="120"
                viewBox="0 0 30 30"
                fill="none"
                className="w-4 h-4 hidden md:inline-block"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4"
                  stroke="#bc6c25"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12H14M14 12L11 9M14 12L11 15"
                  stroke="#bc6c25"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
