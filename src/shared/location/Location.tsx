import { useEffect, useState } from "react";
import {
  getCityCorpData,
  getDistrictData,
  getDivisionData,
  getUnionData,
  getUpazilaData,
} from "@/api/Reqest";

export default function Location({ singleData, setsingleData }: any) {
  const [divisions, setDivisions] = useState<any>([]);
  const [districts, setdistricts] = useState<any>([]);
  const [upazila, setupazila] = useState<any>([]);
  const [union, setunion] = useState<any>([]);
  const [cityCorp, setCityCorp] = useState<any>([]);
  const [error, setError] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState("Upazila");

  const divisionId =
    singleData?.location?.divisionId ||
    singleData?.address?.divisionId ||
    singleData?.personal_info?.presentAddress?.divisionId ||
    singleData?.presentAddress?.divisionId;
  const districtId =
    singleData?.location?.districtId ||
    singleData?.address?.districtId ||
    singleData?.personal_info?.presentAddress?.districtId ||
    singleData?.presentAddress?.districtId;
  const upazilaId =
    singleData?.location?.upazilaId ||
    singleData?.address?.upazilaId ||
    singleData?.personal_info?.presentAddress?.upazilaId ||
    singleData?.presentAddress?.upazilaId;
  const villageName =
    singleData?.location?.villageName ||
    singleData?.address?.villageName ||
    singleData?.personal_info?.presentAddress?.villageName ||
    singleData?.presentAddress?.villageName;
  const cityCorporationId =
    singleData?.location?.cityCorporationId ||
    singleData?.address?.cityCorporationId ||
    singleData?.personal_info?.presentAddress?.cityCorporationId ||
    singleData?.presentAddress?.cityCorporationId;
  const postCode =
    singleData?.location?.postCode ||
    singleData?.address?.postCode ||
    singleData?.personal_info?.presentAddress?.postCode ||
    singleData?.presentAddress?.postCode;
  const address =
    singleData?.location?.address ||
    singleData?.address?.address ||
    singleData?.personal_info?.presentAddress?.address ||
    singleData?.presentAddress?.address;
  const wardName =
    singleData?.location?.wardName ||
    singleData?.address?.wardName ||
    singleData?.personal_info?.permanentAddress?.wardName ||
    singleData?.permanentAddress?.wardName;

  console.log(`post`, postCode);
  useEffect(() => {
    const allDivision = JSON.parse(localStorage.getItem("division_list"));
    setDivisions(allDivision);
    getDistrict(divisionId);
    getUpazilla(districtId);
    // getUnion(singleData?.location?.upazilaId    )
  }, [divisionId]);

  const getDistrict = (divisionId: any) => {
    const allDivision = JSON.parse(localStorage.getItem("district_list"));
    const all_district = allDivision.filter(
      (d: any) => d.divisionId == divisionId,
    );
    setdistricts(all_district);
  };

  const getUpazilla = (districtId: any) => {
    const allDivision = JSON.parse(localStorage.getItem("upazila_list"));
    const all_district = allDivision.filter(
      (d: any) => d.districtId == districtId,
    );
    setupazila(all_district);
  };

  const getUnion = (upazilaId: any) => {
    // setUpazillaId(selectedDistrict);
    getUnionData(upazilaId)
      .then((data) => {
        setunion(data); // Store the fetched data in state
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  };

  const getCityCorp = (districtId: any) => {
    // setUpazillaId(selectedDistrict);
    getCityCorpData(districtId)
      .then((data) => {
        setCityCorp(data); // Store the fetched data in state
      })
      .catch((err) => {
        setError("Error fetching data");
        console.error(err);
      });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      {/* Division */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          Division
        </label>
        <select
          required
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          name="location.divisionId"
          value={divisionId}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
            // setSelectedDivision(e.target.value);
            getDistrict(e.target.value);
          }}
        >
          <option value={""}>Select Division</option>
          {divisions?.map((division) => (
            <option key={division?.id} value={division?.id}>
              {division?.nameBn || division?.name}
            </option>
          ))}
        </select>
      </div>

      {/* District */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          District
        </label>
        <select
          required
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          id="districtId"
          name="location.districtId"
          value={districtId}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
            getUpazilla(e.target.value);
            getCityCorp(e.target.value);
          }}
        >
          <option value={""}>Select District</option>
          {districts?.map((district) => (
            <option key={district?.id} value={district?.id}>
              {district?.nameBn || district?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upazila/City Corporation Selection */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
          Type
        </label>
        <select
          required
          className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
          // value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">Select</option>
          <option
            value="Upazila"
            selected={selectedType == "Upazila" || upazilaId}
          >
            Upazila
          </option>
          <option
            value="City Corporation"
            selected={selectedType == "City Corporation" || cityCorporationId}
          >
            City Corporation
          </option>
        </select>
      </div>

      {/* Conditionally Render Fields Based on Selection */}
      {selectedType === "Upazila" || upazilaId ? (
        <>
          {/* Upazila */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Upazila
            </label>
            <select
              required
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              name="location.upazilaId"
              value={upazilaId}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
                getUnion(e.target.value);
              }}
            >
              <option value={""}>Select Upazila</option>
              {upazila?.map((upazila) => (
                <option key={upazila?.id} value={upazila?.id}>
                  {upazila?.nameBn || upazila?.name}
                </option>
              ))}
            </select>
          </div>

          {/* village */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Village
            </label>

            <input
              id="villageName"
              type="text"
              placeholder="Village"
              name="location.villageName"
              value={villageName || villageName}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>

          {/* postCode */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Post Code f
            </label>

            <input
              id="postCode"
              type="text"
              placeholder="postal Code"
              name="location.postCode"
              value={postCode}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Address
            </label>

            <input
              id="address"
              type="text"
              placeholder="Address here"
              defaultValue={address}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              name="location.address"
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>
        </>
      ) : (
        <>
          {/* City Corporation */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              City Corporation
            </label>
            <select
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              name="location.cityCorporationId"
              value={cityCorporationId}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
            >
              <option value={""}>Select City Corporation</option>
              {cityCorp?.map((cityCorp) => (
                <option key={cityCorp?.id} value={cityCorp?.id}>
                  {cityCorp?.nameBn || cityCorp?.name}
                </option>
              ))}
            </select>
          </div>

          {/* postCode */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Post Code
            </label>

            <input
              id="postCode"
              type="text"
              placeholder="postal Code"
              name="location.postCode"
              value={postCode}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Village
            </label>

            <input
              id="villageName"
              type="text"
              placeholder="Village"
              name="location.villageName"
              value={villageName}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>

          {/* Ward No. */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Ward No.
            </label>
            <input
              id="wardName"
              type="text"
              value={wardName}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              placeholder="Ward"
              name="location.wardName"
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>
          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Address
            </label>

            <input
              id="address"
              type="text"
              placeholder="Address here"
              name="location.address"
              value={address}
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm appearance-none"
            />
          </div>
        </>
      )}
    </div>
  );
}
