import { accessPermission } from "@/utils";
import ResetButton from "./CancelButton";
import SendForApprovalButton from "./SendForApprovalButton";
import UpdateButton from "./UpdateButton";

const CreateUpdateBtn = ({ setsingleData, loading }: any) => {
  const data: any = accessPermission();

  const tmpAddBtn = data?.permission?.find(
    (d: any) => d.name == "Create" && d.method == "POST",
  );

  const addButton = tmpAddBtn?.checked == false ? false : true;

  return (
    <>
      {addButton && (
        <div className="flex justify-end mt-5 gap-5">
          {/* cancel btn */}
          <ResetButton setsingleData={setsingleData} />
          {/* add btn */}

          <div className="flex justify-end mt-5">
            <button
              disabled={loading}
              className=" flex justify-center items-center bg-primaryColor font-bold text-sm text-white rounded-lg px-5   gap-2 py-3"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.7601 3.77017V14.7317C16.7601 15.192 16.606 15.5763 16.2976 15.8847C15.9893 16.193 15.605 16.3472 15.1446 16.3472H2.37563C1.9153 16.3472 1.53097 16.193 1.22263 15.8847C0.914299 15.5763 0.760132 15.192 0.760132 14.7317V1.96267C0.760132 1.50233 0.914299 1.118 1.22263 0.809668C1.53097 0.501335 1.9153 0.347168 2.37563 0.347168H13.3371L16.7601 3.77017ZM15.7601 4.19717L12.9101 1.34717H2.37563C2.19613 1.34717 2.04863 1.40483 1.93313 1.52017C1.8178 1.63567 1.76013 1.78317 1.76013 1.96267V14.7317C1.76013 14.9112 1.8178 15.0587 1.93313 15.1742C2.04863 15.2895 2.19613 15.3472 2.37563 15.3472H15.1446C15.3241 15.3472 15.4716 15.2895 15.5871 15.1742C15.7025 15.0587 15.7601 14.9112 15.7601 14.7317V4.19717ZM8.76013 12.8857C9.31147 12.8857 9.78263 12.6902 10.1736 12.2992C10.5646 11.9082 10.7601 11.437 10.7601 10.8857C10.7601 10.3343 10.5646 9.86317 10.1736 9.47217C9.78263 9.08117 9.31147 8.88567 8.76013 8.88567C8.2088 8.88567 7.73763 9.08117 7.34663 9.47217C6.95563 9.86317 6.76013 10.3343 6.76013 10.8857C6.76013 11.437 6.95563 11.9082 7.34663 12.2992C7.73763 12.6902 8.2088 12.8857 8.76013 12.8857ZM3.52938 6.11642H10.9524V3.11642H3.52938V6.11642ZM1.76013 4.19717V15.3472V1.34717V4.19717Z"
                  fill="white"
                />
              </svg>{" "}
              Update {loading ? "..." : ""}
            </button>
          </div>

          
        </div>
      )}
    </>
  );
};

export default CreateUpdateBtn;
