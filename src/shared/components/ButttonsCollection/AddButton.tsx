import { accessPermission } from "@/utils";
import ResetButton from "./CancelButton"
import SendForApprovalButton from "./SendForApprovalButton";

const AddButton = ({setsingleData, loading, setaddFormShow}:any) => {
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
          <ResetButton setsingleData={setsingleData} setaddFormShow={setaddFormShow} />
          {/* add btn */}
          <SendForApprovalButton loading={loading} />
        </div>
      )}
    </>
  );
};

export default AddButton;
