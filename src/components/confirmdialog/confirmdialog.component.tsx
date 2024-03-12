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
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-center">
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
          >
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </BasicDialog>
  );
}
