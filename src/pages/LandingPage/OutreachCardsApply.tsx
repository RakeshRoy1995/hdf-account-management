import { useEffect, useState } from "react";
import cardImage from "../../../assets/main page/demopic.png";
import { Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { calculateAge } from "@/utils";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const OutreachCardsApply = () => {
  const { id } = useParams();
  const { error, common_data, fetchDataCommon, setcommon_Data, singleData } =
    useFetch(`${API_URL}/call-for-application`);

  const [open, setOpen] = useState(false);
  const [criteria, setcriteria] = useState([]);
  const [Component, setComponent] = useState([]);
  const [PO, setPO] = useState([]);

  const [data, setdata] = useState<any>({});
  const [projectName, setprojectName] = useState("");
  const [banchName, setbanchName] = useState("");
  const [PO_name, setPO_name] = useState<any>("");
  const [age, setage] = useState<any>("");

  const [_project, set_project] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [checkObj, setcheckObj] = useState<any>({});
  const [checkCiteria, setcheckCiteria] = useState<any>({});

  const getOutreachProgramme = async (id: any) => {
    // project Organization
    const page_list = `${API_URL}/availableOutreachProgram/getDetails/${id}`;
    const { data }: any = await submitFormData(page_list, {});
    setdata(data);

    const page_list_project = `${API_URL}/project?currentPage=1&pageSize=5000`;
    const page_list_project_data: any = await submitFormData(
      page_list_project,
      {},
    );

    const _project = page_list_project_data?.data?.content;
    set_project(_project);

    const projectName = _project.find(
      (d: any) => d.projectId == data?.projectId,
    );

    const page_list_branch = `${API_URL}/branch?currentPage=1&pageSize=10000`;
    const branch_data: any = await submitFormData(page_list_branch, {});

    const Branch = branch_data?.data?.content;
    setBranch(Branch);

    const branchName = Branch.find((d: any) => d.id == data?.branchId);

    const page_list_PO = `${API_URL}/partner-organization?currentPage=1&pageSize=1000`;
    const PO_data: any = await submitFormData(page_list_PO, {});

    const PO = PO_data?.data?.content;
    setBranch(PO);

    const POname = PO.find(
      (d: any) => d.partnerId == data?.partnerOrganizationId,
    );
    setprojectName(projectName?.name);
    setbanchName(branchName?.name);
    setPO_name(POname?.nameBn);
  };

  // Function to handle closing modal
  const handleClose = () => setOpen(false);

  const fetchComponent = async () => {
    // partner Organization
    const page_list = `${API_URL}/component?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setComponent(data);
  };

  const fetchPO = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=1000&recordStatus=A`;
    const { data }: any = await submitFormData(page_list, {});
    setPO(data?.content);
  };

  useEffect(() => {
    getOutreachProgramme(id);
    fetchComponent();
    fetchPO();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }
    const arr = Object.values(obj);
    const critariaAyy = data?.eligibilityCriteria.map((data: any) => {
      let obj = {};
      if (arr.includes(data?.eligibilityQuestion)) {
        obj = {
          criteriaName: data?.eligibilityQuestion,
          isCriteriaTrue: true,
        };

        return obj;
      } else {
        obj = {
          criteriaName: data?.eligibilityQuestion,
          isCriteriaTrue: false,
        };

        return obj;
      }
    });

    obj.cfpCriteria = critariaAyy;
    obj.isApplicantExists = false;
    obj.location = {
      divisionId: "1",
      districtId: "1",
      upazilaId: "1",
      pourasabhaId: "1",
      unionId: "9",
      villageId: "3",
      wardId: "2",
    };

    // obj.location = {};

    const page_list = `${API_URL}/application-submission`;
    const method = "POST";

    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetchDataCommon(page_list, options);
  };

  const applicantsExist = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=1000&recordStatus=A`;
    const { data }: any = await submitFormData(page_list, {});
    setPO(data?.content);
  };

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "বন্ধ করুন",
      });
      setcommon_Data(null);
      //   fetchData();
    }

    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "বন্ধ করুন",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (checkObj?.cfpDateOfBirth) {
      const age = calculateAge(checkObj?.cfpDateOfBirth);
      setage(age);
    }
  }, [checkObj, checkCiteria]);

  const button_disable = data?.eligibilityCriteria?.filter(
    (d: any) => checkCiteria[d.eligibilityQuestion],
  );

  console.log(`button_disable`, button_disable);

  return (
    <div className="flex justify-center items-center gap-5 m-10">
      {/* card */}
      <div className=" max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200 p-6">
        {/* Image */}
        <img
          className="w-full rounded-lg"
          src={cardImage}
          alt="Training group"
        />

        {/* Content */}
        <div className="text-xs font-normal m-4">
          <div className="leading-5">
            <p>
              {" "}
              <b>Outreach Name:</b> {data?.outreachProgramName}{" "}
            </p>
            <p>
              {" "}
              <b>Outreach Code:</b> {data?.outreachProgramCode}
            </p>
            <p>
              {" "}
              <b>Project:</b> {projectName || ""}
            </p>
            <p>
              {" "}
              <b>Partner Organization:</b> {PO_name || ""}
            </p>
            <p>
              {" "}
              <b>Branch:</b> {banchName || ""}
            </p>
            <p>
              {" "}
              <b>Venue:</b> {data?.venue || ""}
            </p>
            <p>
              {" "}
              <b>From Date:</b> {data?.fromDate}{" "}
            </p>
            <p>
              {" "}
              <b>To Date:</b> {data?.toDate}
            </p>
            <p>
              {" "}
              <b>Eligibility Criteria:</b>{" "}
            </p>
            {data?.eligibilityCriteria?.map((el: any, key: number) => (
              <p key={key}>
                {key + 1}. {el?.eligibilityQuestion}
              </p>
            ))}
          </div>
        </div>
        {/* Button to open modal */}
      </div>

      <form
        action="submit"
        className="p-4 space-y-6 shadow-lg rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="callForApplicationId" value={"0"} />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <label
              htmlFor="cfpFirstName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              First Name
            </label>
            <input
              required
              maxLength={50}
              name="cfpFirstName"
              id="cfpFirstName"
              defaultValue={singleData?.cfpFirstName}
              type="text"
              placeholder="First Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="cfpLastName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Last Name
            </label>
            <input
              required
              maxLength={50}
              name="cfpLastName"
              id="cfpLastName"
              defaultValue={singleData?.cfpLastName}
              type="text"
              placeholder="Last Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="cfpNid"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              NID
            </label>
            <input
              required
              maxLength={17}
              name="cfpNid"
              id="cfpNid"
              onChange={(e) =>
                setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              }
              defaultValue={singleData?.cfpNid}
              type="text"
              placeholder="Nid here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="cfpDateOfBirth"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Date of Birth
            </label>
            <input
              id="cfpDateOfBirth"
              type="date"
              name="cfpDateOfBirth"
              onChange={(e) =>
                setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              }
              // onChange={(e) => setDateOfSigning(e.target.value)}
              className="border p-4 rounded appearance-none h-14"
            />
            <span className="open-button">
              <button type="button">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17364 16.1293C1.76687 16.1293 1.42725 15.9931 1.15479 15.7206C0.882325 15.4481 0.746094 15.1085 0.746094 14.7017V3.4183C0.746094 3.01153 0.882325 2.67191 1.15479 2.39945C1.42725 2.12698 1.76687 1.99075 2.17364 1.99075H3.73684V0.0195312H4.68854V1.99075H11.0102V0.0195312H11.8939V1.99075H13.4571C13.8639 1.99075 14.2035 2.12698 14.4759 2.39945C14.7484 2.67191 14.8846 3.01153 14.8846 3.4183V14.7017C14.8846 15.1085 14.7484 15.4481 14.4759 15.7206C14.2035 15.9931 13.8639 16.1293 13.4571 16.1293H2.17364ZM2.17364 15.2456H13.4571C13.5932 15.2456 13.7178 15.189 13.8311 15.0758C13.9444 14.9625 14.001 14.8378 14.001 14.7017V6.95294H1.62975V14.7017C1.62975 14.8378 1.68638 14.9625 1.79964 15.0758C1.91289 15.189 2.03756 15.2456 2.17364 15.2456ZM1.62975 6.06906H14.001V3.4183C14.001 3.28222 13.9444 3.15755 13.8311 3.0443C13.7178 2.93104 13.5932 2.87441 13.4571 2.87441H2.17364C2.03756 2.87441 1.91289 2.93104 1.79964 3.0443C1.68638 3.15755 1.62975 3.28222 1.62975 3.4183V6.06906ZM7.81537 10.0795C7.63304 10.0795 7.47413 10.0119 7.33863 9.87653C7.20329 9.74118 7.13561 9.58227 7.13561 9.39979C7.13561 9.21746 7.20329 9.05863 7.33863 8.92328C7.47413 8.78793 7.63304 8.72026 7.81537 8.72026C7.99769 8.72026 8.15661 8.78793 8.2921 8.92328C8.42745 9.05863 8.49512 9.21746 8.49512 9.39979C8.49512 9.58227 8.42745 9.74118 8.2921 9.87653C8.15661 10.0119 7.99769 10.0795 7.81537 10.0795ZM4.28073 10.0795C4.0984 10.0795 3.93949 10.0119 3.804 9.87653C3.66865 9.74118 3.60098 9.58227 3.60098 9.39979C3.60098 9.21746 3.66865 9.05863 3.804 8.92328C3.93949 8.78793 4.0984 8.72026 4.28073 8.72026C4.46306 8.72026 4.62197 8.78793 4.75746 8.92328C4.89281 9.05863 4.96048 9.21746 4.96048 9.39979C4.96048 9.58227 4.89281 9.74118 4.75746 9.87653C4.62197 10.0119 4.46306 10.0795 4.28073 10.0795ZM11.35 10.0795C11.1677 10.0795 11.0088 10.0119 10.8733 9.87653C10.7379 9.74118 10.6702 9.58227 10.6702 9.39979C10.6702 9.21746 10.7379 9.05863 10.8733 8.92328C11.0088 8.78793 11.1677 8.72026 11.35 8.72026C11.5323 8.72026 11.6912 8.78793 11.8267 8.92328C11.9621 9.05863 12.0298 9.21746 12.0298 9.39979C12.0298 9.58227 11.9621 9.74118 11.8267 9.87653C11.6912 10.0119 11.5323 10.0795 11.35 10.0795ZM7.81537 13.4783C7.63304 13.4783 7.47413 13.4106 7.33863 13.2753C7.20329 13.14 7.13561 12.981 7.13561 12.7986C7.13561 12.6162 7.20329 12.4573 7.33863 12.3218C7.47413 12.1865 7.63304 12.1188 7.81537 12.1188C7.99769 12.1188 8.15661 12.1865 8.2921 12.3218C8.42745 12.4573 8.49512 12.6162 8.49512 12.7986C8.49512 12.981 8.42745 13.14 8.2921 13.2753C8.15661 13.4106 7.99769 13.4783 7.81537 13.4783ZM4.28073 13.4783C4.0984 13.4783 3.93949 13.4106 3.804 13.2753C3.66865 13.14 3.60098 12.981 3.60098 12.7986C3.60098 12.6162 3.66865 12.4573 3.804 12.3218C3.93949 12.1865 4.0984 12.1188 4.28073 12.1188C4.46306 12.1188 4.62197 12.1865 4.75746 12.3218C4.89281 12.4573 4.96048 12.6162 4.96048 12.7986C4.96048 12.981 4.89281 13.14 4.75746 13.2753C4.62197 13.4106 4.46306 13.4783 4.28073 13.4783ZM11.35 13.4783C11.1677 13.4783 11.0088 13.4106 10.8733 13.2753C10.7379 13.14 10.6702 12.981 10.6702 12.7986C10.6702 12.6162 10.7379 12.4573 10.8733 12.3218C11.0088 12.1865 11.1677 12.1188 11.35 12.1188C11.5323 12.1188 11.6912 12.1865 11.8267 12.3218C11.9621 12.4573 12.0298 12.6162 12.0298 12.7986C12.0298 12.981 11.9621 13.14 11.8267 13.2753C11.6912 13.4106 11.5323 13.4783 11.35 13.4783Z"
                    fill="#5F6368"
                  />
                </svg>
              </button>
            </span>
          </div>

          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpGender"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Gender
            </label>
            <div>
              <select
                required
                name="cfpGender"
                id="cfpGender"
                value={singleData?.cfpGender}
                className="w-full border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="THIRD">Other</option>
              </select>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none xs:ml-64 md:ml-[170px] lg:ml-[180px] xl:ml-[180px] mt-5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                  fill="#5F6368"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="cfpAge"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Age
            </label>
            <input
              required
              maxLength={50}
              name="cfpAge"
              id="cfpAge"
              value={age}
              type="text"
              placeholder="Father Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="FatherName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Father's Name
            </label>
            <input
              required
              maxLength={50}
              name="cfpFatherName"
              id="FatherName"
              defaultValue={singleData?.cfpFatherName}
              type="text"
              placeholder="Father Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="cfpMobileNo"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Mobile No.
            </label>
            <input
              required
              maxLength={11}
              name="cfpMobileNo"
              id="cfpMobileNo"
              onChange={(e) =>
                setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              }
              defaultValue={singleData?.cfpMobileNo}
              type="text"
              placeholder="Mobile no here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpQualification"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Academic Qualification
            </label>
            <div>
              <select
                required
                name="cfpQualification"
                id="cfpQualification"
                value={singleData?.cfpQualification}
                className="w-full border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>
                <option value="Uneducated">Uneducated</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 8">Class 8</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="Honours">Honours</option>
                <option value="Bachelor">BACHELOR</option>
                <option value="Masters">MASTERS</option>

                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-between relative">
            <label
              htmlFor="cfpComponentId"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Component
            </label>
            <div>
              <select
                required
                name="cfpComponentId"
                id="cfpComponentId"
                value={singleData?.cfpComponentId}
                className="w-full border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>
                {Component?.map((cmd: any) => (
                  <option value={cmd?.componentId}>{cmd?.componentName}</option>
                ))}
              </select>
            </div>
          </div>

          <input type="hidden" name="cfpProjectId" value={data?.projectId} />
          <input
            type="hidden"
            name="cfpPartnerOrganizationId"
            value={data?.partnerOrganizationId}
          />
          <input type="hidden" name="cfpBranchId" value={data?.branchId} />
          <input
            type="hidden"
            name="cfpOutreachProgramId"
            value={data?.outreachProgramId}
          />
          <input type="hidden" name="cfpRecStatus" value={"A"} />
        </div>

        {data?.eligibilityCriteria?.map((c_data: any) => (
          <div className=" border-gray-50 p-3 rounded-xl">
            <label className="">{c_data?.eligibilityQuestion}</label>
            <div className="flex ">
              <label className="flex items-center">
                <input
                  onClick={(e: any) =>
                    setcheckCiteria({
                      ...checkCiteria,
                      [e.target.name]: e.target.checked,
                    })
                  }
                  value={c_data?.eligibilityQuestion}
                  name={c_data?.eligibilityQuestion}
                  id="mcpHasRelevantCertification"
                  type="checkbox"
                  className="mr-2 " // Use a custom class
                />
                Yes
              </label>
            </div>
          </div>
        ))}

        {data?.eligibilityCriteria?.length == button_disable?.length && (
          <div className="flex justify-end mt-4 gap-5">
            <button className="text-sm  hover:font-bold bg-primaryColor text-white  rounded-full px-6 py-3">
              Apply
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OutreachCardsApply;
