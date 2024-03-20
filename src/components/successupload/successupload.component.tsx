import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function SuccessComponent() {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex flex-col">
      <div
        id="alert-additional-content-3"
        className="p-4 border rounded-lg bg-white justify-center"
        role="alert"
      >
        <div className="">
          <div className="flex flex-row items-center justify-center">
            <h3 className="text-xl">SUCCESS</h3>
          </div>
        </div>
        <div className="py-5 text-center">
          The file was successfully uploaded.
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            onClick={onDismiss}
            className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded ml-3"
          >
            UPLOAD ANOTHER FILE
          </button>

          <button
            type="button"
            className="bg-secondary-100 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded mr-3"
            data-dismiss-target="#alert-additional-content-3"
            aria-label="Close"
          >
            <Link href="/">GO HOME PAGE</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
