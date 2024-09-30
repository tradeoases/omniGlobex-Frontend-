import { useState } from "react";

import { useForm } from "react-hook-form";
import { initialCompanyInfo } from "./data";

const SupplierProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [companyInfo, setCompanyInfo] = useState(initialCompanyInfo);

  const { register, handleSubmit } = useForm({
    defaultValues: companyInfo,
  });

  const onSubmit = () => {
    <div>submitted successfully</div>;
  };

  return (
    <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Company Profile Section */}
      <section className="w-full">
        <h2 className="text-xl font-semibold mb-4">Company Profile</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Editable Company Info Form */}
            <div>
              <label className="block font-medium mb-2">Company Name:</label>
              <input
                type="text"
                {...register("name")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Business Type:</label>
              <input
                type="text"
                {...register("businessType")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Location:</label>
              <input
                type="text"
                {...register("location")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Employees:</label>
              <input
                type="number"
                {...register("employees")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Certifications:</label>
              <input
                type="text"
                {...register("certifications")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Track Record:</label>
              <textarea
                {...register("trackRecord")}
                className="input-field border px-4 py-2 w-full rounded"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button type="submit" className="bg-main py-2 px-2 rounded">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* Displaying Static Company Info */}
            <ul className="mb-6">
              <li className="mb-2">
                <strong>Company Name:</strong> {companyInfo.name}
              </li>
              <li className="mb-2">
                <strong>Business Type:</strong> {companyInfo.businessType}
              </li>
              <li className="mb-2">
                <strong>Location:</strong> {companyInfo.location}
              </li>
              <li className="mb-2">
                <strong>Years in Business:</strong>{" "}
                {new Date().getFullYear() - companyInfo.establishedYear} years
              </li>
              <li className="mb-2">
                <strong>Number of Employees:</strong> {companyInfo.employees}
              </li>
              <li className="mb-2">
                <strong>Certifications:</strong>{" "}
                {companyInfo.certifications.join(", ")}
              </li>
            </ul>

            {/* Ratings & Reviews */}
            <h3 className="text-lg font-semibold mb-4">Ratings & Reviews</h3>
            <div className="ratings mb-4">
              <label className="block text-sm font-medium">
                Overall Rating:
              </label>
              <div className="stars mt-2">
                {/* Displaying star rating */}
                {Array(Math.floor(companyInfo.ratings)).fill("★").join("")}
                {companyInfo.ratings % 1 !== 0 && "☆"}{" "}
                {/* Half star if needed */}
                <span className="ml-2">{companyInfo.ratings}/5</span>
              </div>
            </div>
            <div className="reviews mb-6">
              <label className="block text-sm font-medium">
                Recent Reviews:
              </label>
              <div className="review-list mt-2">
                {companyInfo.reviews.map((review, index) => (
                  <p key={index} className="border-b py-2">
                    "{review.text}" - {review.reviewer}
                  </p>
                ))}
              </div>
            </div>

            {/* Track Record */}
            <h3 className="text-lg font-semibold mb-4">Track Record</h3>
            <ul className="mb-6">
              {companyInfo.trackRecord.map((record, index) => (
                <li key={index} className="mb-2">
                  {record}
                </li>
              ))}
            </ul>

            {/* Update Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-main px-2 py-2 rounded"
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
