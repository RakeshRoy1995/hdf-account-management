import { useEffect, useState } from "react";
import cardImage from "../../../assets/main page/demopic.png";
import { Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { submitFormData } from "@/api/Reqest";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const OutreachCards = ({
  outreachProgramId,
  _project,
  Branch,
  PO,
  outReachData,
}: any) => {
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState<any>({});
  const [projectName, setprojectName] = useState("");
  const [banchName, setbanchName] = useState("");
  const [PO_name, setPO_name] = useState("");

  const getOutreachProgramme = async (id: any) => {
    // project Organization
    const page_list = `${API_URL}/availableOutreachProgram/getDetails/${id}`;
    const { data }: any = await submitFormData(page_list, {});
    setdata(data);
    const projectName = _project.find(
      (d: any) => d.projectId == data?.projectId,
    );
    const branchName = Branch.find((d: any) => d.id == data?.branchId);
    const POname = PO.find(
      (d: any) => d.partnerId == data?.partnerOrganizationId,
    );
    setprojectName(projectName?.name);
    setbanchName(branchName?.name);
    setPO_name(POname?.nameBn);
  };

  // Function to handle opening modal
  const handleOpen = (id: any) => {
    setOpen(true);
    getOutreachProgramme(id);
  };
  // Function to handle closing modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* card */}
      <div className=" max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 p-5">
        {/* Image */}
        <img
          className="w-full rounded-lg"
          src={cardImage}
          alt="Training group"
        />

        {/* Content */}
        <div className="p-4">
          <div className="text-base  font-normal mb-2 ">
            <p>Outreach Name: {outReachData?.outreachProgramName} </p>
            <p>Outreach Code: {outReachData?.outreachProgramCode}</p>
            <p>From Date: {outReachData?.fromDate} </p>
            <p>To Date: {outReachData?.toDate}</p>
          </div>
        </div>
        {/* Button to open modal */}
        <div className="flex justify-end">
          <button
            onClick={(e:any) => handleOpen(outreachProgramId)}
            className="text-sm  bg-primaryColor text-white  rounded-full px-6 py-3"
          >
            Details
          </button>
        </div>
      </div>

      {/* MUI Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Modal content */}
          <img
            className="w-full rounded-lg mb-4"
            src={cardImage}
            alt="Training group"
          />
          <div className="text-xs font-normal">
            <div className="px-4">
              <p>Outreach Name: {data?.outreachProgramName} </p>
              <p>Outreach Code: {data?.outreachProgramCode}</p>
              <p>Project: {projectName || ""}</p>
              <p>Partner Organization: {PO_name || ""}</p>
              <p>Branch: {banchName || ""}</p>
              <p>Venue: {data?.venue || ""}</p>
              <p>From Date: {data?.fromDate} </p>
              <p>To Date: {data?.toDate}</p>
              <p>Eligibility Criteria:</p>
              {data?.eligibilityCriteria?.map((el: any, key: number) => (
                <p key={key}>
                  {key + 1}. {el?.eligibilityQuestion}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-5">
            <button
              onClick={handleClose}
              type="button"
              className="text-sm hover:text-primaryColor hover:font-bold"
            >
              Close
            </button>
            <Link to={"/apply-call-for-submission/" + outreachProgramId}>
              <button className="text-sm hover:text-primaryColor hover:font-bold">
                Apply
              </button>
            </Link>
          </div>

          {/* Close button */}
        </Box>
      </Modal>
    </div>
  );
};

export default OutreachCards;
