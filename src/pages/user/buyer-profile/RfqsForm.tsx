import React, { useState } from "react";
import { RfqDate } from "./RfqDate";

interface FormData {
  productName: string;
  productCategory: string;
  aboutProduct: string;
  productImage: File | null;
  sourcingType: string;
  estimatedQuantity: string;
  units: string;
  preferredUnitPrice: string;
  price: string;
}

interface FormErrors {
  productName?: string;
  productCategory?: string;
  aboutProduct?: string;
  productImage?: string;
  sourcingType?: string;
  estimatedQuantity?: string;
  units?: string;
  preferredUnitPrice?: string;
  price?: string;
}

const RFQForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productCategory: "",
    aboutProduct: "",
    productImage: null,
    sourcingType: "",
    estimatedQuantity: "",
    units: "",
    preferredUnitPrice: "",
    price: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, productImage: e.target.files[0] });
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.productName) errors.productName = "Product name is required";
    if (!formData.productCategory)
      errors.productCategory = "Please select a product category";
    if (!formData.aboutProduct)
      errors.aboutProduct = "Please provide details about your product";
    if (!formData.productImage)
      errors.productImage = "Please upload an image of your product";
    if (!formData.estimatedQuantity)
      errors.estimatedQuantity = "Estimated quantity is required";
    if (!formData.sourcingType)
      errors.sourcingType = "Sourcing Type is required";
    if (!formData.units) errors.units = "Please select a unit";
    if (!formData.preferredUnitPrice)
      errors.preferredUnitPrice = "Please select a unit price";
    if (!formData.price) errors.price = "Please select a price";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setSuccessMessage("Your RFQ has been submitted successfully!");
      setFormErrors({});
      setFormData({
        productName: "",
        productCategory: "",
        aboutProduct: "",
        productImage: null,
        sourcingType: "",
        estimatedQuantity: "",
        units: "",
        preferredUnitPrice: "",
        price: "",
      });
    } else {
      setFormErrors(errors);
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create RFQ</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter a specific product name"
            value={formData.productName}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formErrors.productName && (
            <p className="text-red-500 text-sm">{formErrors.productName}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Product Category
          </label>
          <select
            name="productCategory"
            value={formData.productCategory}

            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Automotive">Automotive</option>
            <option value="Construction">Construction</option>
            <option value="Textiles">Textiles</option>
          </select>
          {formErrors.productCategory && (
            <p className="text-red-500 text-sm">{formErrors.productCategory}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            About Your Product
          </label>
          <textarea
            name="aboutProduct"
            value={formData.aboutProduct}
            placeholder="Please indicate your detailed requirements to ensure fast and efficient response from suppliers."
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
          {formErrors.aboutProduct && (
            <p className="text-red-500 text-sm">{formErrors.aboutProduct}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Upload Product Image
          </label>
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formErrors.productImage && (
            <p className="text-red-500 text-sm">{formErrors.productImage}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-700">
            Sourcing Type
          </label>
          <select
            name="sourcingType"
            value={formData.sourcingType}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select one</option>
            <option value="Business Service">Business Service</option>
            <option value="Customized Product">Customized Product</option>
            <option value="Non-customized Product">
              Non-customized Product
            </option>
            <option value="Total Solution">Total Solution</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.sourcingType && (
            <p className="text-red-500 text-sm">{formErrors.sourcingType}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium text-gray-700">
              Estimated Order Quantity
            </label>
            <input
              type="text"
              name="estimatedQuantity"
              placeholder="e.g. 1000"
              value={formData.estimatedQuantity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formErrors.estimatedQuantity && (
              <p className="text-red-500 text-sm">
                {formErrors.estimatedQuantity}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Units</label>
            <select
              name="units"
              value={formData.units}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Unit</option>
              <option value="Kg">Kg</option>
              <option value="Liters">Liters</option>
              <option value="Meters">Meters</option>
              <option value="Pieces">Pieces</option>
            </select>
            {formErrors.units && (
              <p className="text-red-500 text-sm">{formErrors.units}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Preferred Unit Price
            </label>
            <select
              name="preferredUnitPrice"
              value={formData.preferredUnitPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
            {formErrors.preferredUnitPrice && (
              <p className="text-red-500 text-sm">
                {formErrors.preferredUnitPrice}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 60"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formErrors.price && (
              <p className="text-red-500 text-sm">{formErrors.price}</p>
            )}
          </div>
          <RfqDate />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit RFQ
          </button>
        </div>

        {successMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded-md">
            {successMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default RFQForm;
