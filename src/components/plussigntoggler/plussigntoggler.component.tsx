import { Dispatch, SetStateAction } from "react";

interface plusSignToggler {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  label: string;
}

export default function PlusSignToggler(props: plusSignToggler) {
  return (
    <div className=" flex flex-row justify-between">
      {props.label}
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          props.setToggle(!props.toggle);
        }}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          <path
            d="M6 12H18M12 6V18"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
