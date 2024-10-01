import { useState } from "react";
import { useForm } from "react-hook-form";
import { initialCompanyInfo } from "./data";

const SupplierProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);

  const { register, handleSubmit } = useForm({
    defaultValues: companyInfo,
  });

  const onSubmit = (data) => {
    setCompanyInfo(data);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Company Profile Section */}
      <section className="w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Company Profile</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700">Company Name:</label>
                <input
                  type="text"
                  {...register("name")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">Business Type:</label>
                <input
                  type="text"
                  {...register("businessType")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">Location:</label>
                <input
                  type="text"
                  {...register("location")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">Employees:</label>
                <input
                  type="number"
                  {...register("employees")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">Certifications:</label>
                <input
                  type="text"
                  {...register("certifications")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700">Track Record:</label>
                <textarea
                  {...register("trackRecord")}
                  className="border border-gray-300 px-4 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Display Static Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ul className="space-y-2">
                <li>
                  <strong>Company Name:</strong> {companyInfo.name}
                </li>
                <li>
                  <strong>Business Type:</strong> {companyInfo.businessType}
                </li>
                <li>
                  <strong>Location:</strong> {companyInfo.location}
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <strong>Years in Business:</strong>{" "}
                  {new Date().getFullYear() - companyInfo.establishedYear} years
                </li>
                <li>
                  <strong>Number of Employees:</strong> {companyInfo.employees}
                </li>
                <li>
                  <strong>Certifications:</strong> {companyInfo.certifications.join(", ")}
                </li>
              </ul>
            </div>

            {/* Ratings & Reviews */}
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Ratings & Reviews</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Overall Rating:</label>
              <div className="mt-2 text-yellow-500">
                {Array(Math.floor(companyInfo.ratings)).fill("★").join("")}
                {companyInfo.ratings % 1 !== 0 && "☆"}{" "}
                <span className="ml-2 text-gray-700">{companyInfo.ratings}/5</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Recent Reviews:</label>
              <div className="mt-2 space-y-2">
                {companyInfo.reviews.map((review, index) => (
                  <p key={index} className="border-b border-gray-200 py-2">
                    "{review.text}" - {review.reviewer}
                  </p>
                ))}
              </div>
            </div>

            {/* Track Record */}
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Track Record</h3>
            <ul className="space-y-2 mb-6">
              {companyInfo.trackRecord.map((record, index) => (
                <li key={index} className="text-gray-700">
                  {record}
                </li>
              ))}
            </ul>

            {/* Update Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Update Info
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default SupplierProfile;
