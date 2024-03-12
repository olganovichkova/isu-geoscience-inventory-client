interface searchOptionButton {
  text: string;
}

export default function SearchOptionButton(props: searchOptionButton) {
  return (
    <button className="text-primary btn border-primary md:border-2 hover:bg-primary hover:text-white fill-current transition ease-out duration-500">
      <div className="">
        <span className="">{props.text}</span>
      </div>
    </button>
  );
}
