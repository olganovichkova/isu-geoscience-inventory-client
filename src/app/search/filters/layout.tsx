export default function SearchFiltersLayout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {props.modal}
      {props.children}
    </div>
  );
}
