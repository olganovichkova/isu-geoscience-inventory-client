import BasicDialog from "@/components/basicdialog/basicdialog.component";
import Button from "@/components/button/button.component";
interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}
export default function Confirm(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }

  return (
    <BasicDialog open={open} onClose={onClose}>
      <span className="flex justify-center">
        <h2 className="text-xl text-red-600">{title}</h2>
      </span>
      <div className="py-5">{children}</div>
      <div className="flex justify-between">
        <div className="p-1">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Yes
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded"
          >
            No
          </Button>
        </div>
      </div>
    </BasicDialog>
  );
}
