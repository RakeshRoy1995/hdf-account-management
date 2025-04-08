import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { get_all_data, submitFormData } from "@/api/Reqest";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import { SvgIcon, SvgIconProps } from "@mui/material";
import UpdateButtonGL from "@/shared/components/ButttonsCollection/UpdateButtonGL";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import CreateButton from "@/shared/components/ButttonsCollection/CreateButton";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

export default function ParentGL() {
  const user = JSON.parse(localStorage.getItem("customer_login_auth"));

  const [trees, settrees] = useState<any>([]);
  const [currencie, setcurrencie] = useState<any>([]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const toggledItemRef = useRef<{ [itemId: string]: boolean }>({});
  const apiRef = useTreeViewApiRef();

  const [show, setshow] = useState(false);
  const [parentName, setparentName] = useState<any>("");
  const [generatedAcNo, setgeneratedAcNo] = useState("");
  const [addMode, setaddMode] = useState(false);
  const {
    error,
    fetchData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    singleData,
    setsearchData,
    searchData,
    loading,
  } = useFetch(`${API_URL}/permission`);

  const tree = async () => {
    setsearchData({ ...searchData, ["glIsParent"]: true });
    settrees([]);
    let apiEndPoint = ``;

    if (user?.user?.organizationLevelId == 1) {
      apiEndPoint = "glAccount/getTree?organizationLevelId=1";
    } else {
      apiEndPoint = `glAccount/getTree?organizationLevelId=2&organizationId=${user?.user?.partnerOrganizationId}`;
    }

    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    settrees(ministry_List_Array);
  };

  const Getsetcurrencie = async () => {
    const apiEndPoint = "currencies";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setcurrencie(ministry_List_Array);
  };

  useEffect(() => {
    Getsetcurrencie();
    tree();
  }, []);

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      settrees([]);
      tree();
    }

    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "Close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (deleteMsg) {
      //show success message
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let obj: any = {};

    if (addMode) {
      obj = {
        glIsParent: false,
        glIsSubsidiary: false,
        isTransactionEnabled: false,
      };
    } else {
      obj = {
        ...searchData,
        glIsParent: false,
        glIsSubsidiary: false,
        isTransactionEnabled: false,
      };
    }

    for (const [key, value] of formData) {
      console.log(key, ":", value);

      if (key == "glIsParent") {
        obj = { ...obj, [key]: true };
      } else if (key == "glIsSubsidiary") {
        obj = { ...obj, [key]: true };
      } else if (key == "isTransactionEnabled") {
        obj = { ...obj, [key]: true };
      } else {
        obj = { ...obj, [key]: value };
      }
    }

    if (user?.user?.organizationLevelId == 1) {
      delete obj["glOrganizationId"];
    }

    if (addMode) {
      delete obj["glId"];
    }

    let page_list = `${API_URL}/glAccount/save`;
    let method = "POST";

    if (!addMode) {
      page_list = `${API_URL}/glAccount/update`;
      method = "PUT";
    }
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

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean,
  ) => {
    toggledItemRef.current[itemId] = isSelected;
  };

  const handleSelectedItemsChange = (
    event: React.SyntheticEvent,
    newSelectedItems: string[],
  ) => {
    setSelectedItems(newSelectedItems);

    // Select / unselect the children of the toggled item
    Object.entries(toggledItemRef.current).forEach(([itemId, isSelected]) => {
      const item = apiRef.current!.getItem(itemId);
      if (isSelected) {
        setgeneratedAcNo("")
        setparentName(item?.glAccountNo);
        setsearchData(item);
        setshow(true);
        setaddMode(false);
      } 
    });
    toggledItemRef.current = {};
  };

  const CustomTreeItem = styled(TreeItem)({
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
  });

  const generate_ac_no = async (ac_no: any) => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const page_list = `${API_URL}/glAccount/getAccountNo?accountNo=${ac_no}&accountCategory=${searchData?.glAccountCategory}`;

    const { data }: any = await submitFormData(page_list, options);
    setgeneratedAcNo(data);
  };

  return (
    <>
      <Breadcrumb name1={"GL"} name2={"GL Account"} url={"#"} />

      <form className="" onSubmit={handleSubmit}>
        {user?.user?.organizationLevelId < 3 ? (
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-rows-2 grid-flow-col gap-4 mt-5">
              <div className="row-span-1">
                Chart of Account
                <RichTreeView
                  items={trees}
                  apiRef={apiRef}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={handleSelectedItemsChange}
                  onItemSelectionToggle={handleItemSelectionToggle}
                  slots={{
                    expandIcon: AddBoxIcon,
                    collapseIcon: IndeterminateCheckBoxIcon,
                    endIcon: CloseSquare,
                    item: CustomTreeItem,
                  }}
                />
              </div>

              {/* Status */}

              {show && (
                <div className="row-span-11">
                  <>
                  
                    {user?.user?.organizationLevelId < 3 ? (
                      <>
                        <input
                          type="hidden"
                          name="glOrganizationLevelId"
                          value={user?.user?.organizationLevelId}
                        />
                        <input
                          type="hidden"
                          name="glOrganizationId"
                          value={user?.user?.partnerOrganizationId}
                        />

                        {!addMode && (
                          <div
                            className="w-fit p-3 border-2 cursor-pointer rounded-full border-primaryColor text-primaryColor text-sm font-bold  bg-white text-center"
                            onClick={(e: any) => {
                              setaddMode(!addMode);
                              setparentName("");
                            }}
                          >
                            + Create A New Account
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-5">
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Account Category
                            </label>
                            <select
                              name="glAccountCategory"
                              // onChange={(e) => {
                              //   setsearchData({
                              //     ...searchData,
                              //     [e.target.name]: e.target.value,
                              //   });
                              // }}
                              value={searchData?.glAccountCategory}
                              id=""
                              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="">Select Account Category</option>
                              <option value="Asset">Asset</option>
                              <option value="Liability">Liability</option>
                              <option value="Equity">Equity</option>
                              <option value="Income">Income</option>
                              <option value="Expense">Expense</option>
                            </select>
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Account Name
                            </label>

                            <input
                              onChange={(e) => {
                                setsearchData({
                                  ...searchData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              type="text"
                              value={searchData?.glAccountName}
                              name="glAccountName"
                              placeholder="Account Name"
                              className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Account No
                            </label>

                            <input
                              onChange={(e:any) => {

                                const num :number = e.target.value.replace(/[^0-9]/g, '')
                                setparentName(num);
                                generate_ac_no(num);
                              }}
                              value={parentName}
                              name="glAccountNo"
                              type="text"
                              placeholder="Account No ."
                              className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Generated Account No
                            </label>

                            <input
                              readOnly
                              value={generatedAcNo || ""}
                              type="text"
                              placeholder="Generated Account No"
                              className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Parent Account No
                            </label>

                            <input
                              value={addMode ? searchData?.glAccountNo : ""}
                              type="text"
                              name="parentGlAccountNo"
                              placeholder="Parent Account No"
                              className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                            />
                          </div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Currency
                            </label>
                            <select
                              value={searchData?.glCurrencyId}
                              name="glCurrencyId"
                              onChange={(e) => {
                                setsearchData({
                                  ...searchData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              id=""
                              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                            >
                              {/* <option value="">select</option> */}
                              {currencie.map((d: any) => (
                                <option value={d.currencyId}>
                                  {d.currencyCode}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="relative">
                            <div className="flex items-center space-x-1 ">
                              <input
                                onClick={(e: any) => {
                                  setsearchData({
                                    ...searchData,
                                    [e.target.name]: e.target.checked,
                                    ["glIsParent"]: !e.target.checked,
                                  });
                                }}
                                checked={searchData?.glIsSubsidiary}
                                className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                                type="checkbox"
                                name="glIsSubsidiary"
                              />
                              <p className="leading-6">Is Subsidiary Account</p>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="flex items-center space-x-1 ">
                              <input
                                onClick={(e: any) => {
                                  setsearchData({
                                    ...searchData,
                                    [e.target.name]: e.target.checked,
                                    ["glIsSubsidiary"]: !e.target.checked,
                                  });
                                }}
                                checked={searchData?.glIsParent}
                                className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                                type="checkbox"
                                name="glIsParent"
                              />
                              <p className="leading-6">Is Parent Account</p>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="flex items-center space-x-1 ">
                              <input
                                onChange={(e) => {
                                  setsearchData({
                                    ...searchData,
                                    [e.target.name]: e.target.checked,
                                  });
                                }}
                                checked={searchData?.isTransactionEnabled}
                                className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                                type="checkbox"
                                name="isTransactionEnabled"
                              />
                              <p className="leading-6">
                                Is Manual Transaction enable?{" "}
                              </p>
                            </div>
                          </div>

                          <div className="relative"></div>

                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                              Description
                            </label>
                            <textarea
                              onChange={(e) => {
                                setsearchData({
                                  ...searchData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              value={searchData?.glDescription}
                              name="glDescription"
                              placeholder="Description"
                              className="xs:w-full md:w-full lg:w-full xl:w-full  p-5 border border-gray-400 rounded-lg text-black"
                            />
                          </div>

                          

                          {/* Status */}
                          <div className="flex flex-col relative ">
                            <label
                              htmlFor="glRecStatus"
                              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                            >
                              Status
                            </label>
                            <select
                              onChange={(e) => {
                                setsearchData({
                                  ...searchData,
                                  [e.target.name]: e.target.value,
                                });
                              }}
                              value={searchData?.glRecStatus}
                              id="glRecStatus"
                              name="glRecStatus"
                              className=" border p-4 rounded appearance-none h-14"
                            >
                              <option
                                value="A"
                                selected={singleData?.glRecStatus == "A"}
                              >
                                Active{" "}
                              </option>
                              <option
                                value="I"
                                selected={singleData?.glRecStatus == "I"}
                              >
                                Inactive
                              </option>
                            </select>
                          </div>
                          <div className="relative"></div>
                          <div className="relative">

                          {!addMode ? (
                            <UpdateButtonGL
                              setparentName={setparentName}
                              searchData={searchData}
                            />
                          ) : (
                            <CreateButton setaddMode={setaddMode} />
                          )}

                          </div>
                          

                          {/* <CreateUpdateBtn setsingleData={setsearchData} /> */}
                        </div>
                      </>
                    ) : (
                      <>
                        <p>Access denied. Only for PMU and PO users</p>
                      </>
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Access Denied . Only PMU and PO user can Access.</p>
        )}
      </form>
    </>
  );
}
