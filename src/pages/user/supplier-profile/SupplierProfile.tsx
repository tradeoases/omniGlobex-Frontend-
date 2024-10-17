import { useRecoilValue } from "recoil";
import { userStore } from "@/store/user-store";
import moment from "moment";
import { Link } from "react-router-dom";

const SupplierProfile = () => {
  const profile = useRecoilValue(userStore);

  console.log({ profile });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <section className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Company Profile
        </h2>

        {/* Display Static Company Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ul className="space-y-2">
            <li>
              <strong>Company Name:</strong> {profile?.business_name}
            </li>
            <li>
              <strong>Business Type:</strong> {profile?.profile.business_type}
            </li>
            <li>
              <strong>Location:</strong> {profile?.profile.address}
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <strong>Years in Business:</strong>{" "}
              {moment().from(moment(profile?.profile.year_started))} years
            </li>
            <li>
              <strong>Number of Employees:</strong>{" "}
              {profile?.profile.number_of_employees}
            </li>
            {/* <li>
                  <strong>Certifications:</strong>{" "}
                  {profile}
                </li> */}
          </ul>
        </div>

        {/* Ratings & Reviews */}
        {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Ratings & Reviews
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Overall Rating:
          </label>
          <div className="mt-2 text-yellow-500">
            {Array(Math.floor(companyInfo.ratings)).fill("★").join("")}
            {companyInfo.ratings % 1 !== 0 && "☆"}{" "}
            <span className="ml-2 text-gray-700">{companyInfo.ratings}/5</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Recent Reviews:
          </label>
          <div className="mt-2 space-y-2">
            {companyInfo.reviews.map((review, index) => (
              <p key={index} className="border-b border-gray-200 py-2">
                "{review.text}" - {review.reviewer}
              </p>
            ))}
          </div>
        </div> */}

        {/* Track Record */}
        {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Track Record
        </h3>
        <ul className="space-y-2 mb-6">
          {companyInfo.trackRecord.map((record, index) => (
            <li key={index} className="text-gray-700">
              {record}
            </li>
          ))}
        </ul> */}

        {/* Update Button */}
        <Link
          to={"/supplier-dashboard/update-profile"}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Info
        </Link>
      </section>
    </div>
  );
};

export default SupplierProfile;
