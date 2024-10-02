// RFQManagement.js
const RFQManagement = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Request for Quotation (RFQ)</h2>
      <div className="mt-4">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="Additional Details"
            className="border p-2 w-full rounded"
          />
          <button className="bg-main text-white px-4 py-2 rounded">
            Submit RFQ
          </button>
        </form>
      </div>
    </div>
  );
  
  export default RFQManagement;
  