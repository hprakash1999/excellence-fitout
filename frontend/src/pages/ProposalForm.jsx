

// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const ProposalForm = () => {

//     const navigate = useNavigate();


//     const [items, setItems] = useState([]);
//     const [formData, setFormData] = useState({
//         name: "",
//         qty: "",
//         rate: "",
//         tax: "",
//     });

//     const [showModal, setShowModal] = useState(false);
//     const [billInfo, setBillInfo] = useState({
//         billTo: "",
//         subject: "",
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleAddItem = () => {
//         if (!formData.name || !formData.qty || !formData.rate || !formData.tax) {
//             toast.error("Please fill all the fields.");
//             return;
//         }

//         const qty = parseFloat(formData.qty);
//         const rate = parseFloat(formData.rate);
//         const tax = parseFloat(formData.tax);
//         const amount = qty * rate + (qty * rate * tax) / 100;

//         setItems([...items, { ...formData, amount }]);
//         setFormData({ name: "", qty: "", rate: "", tax: "" });
//     };

//     const handleEditItem = (index, field, value) => {
//         const updatedItems = [...items];
//         updatedItems[index][field] = value;

//         const qty = parseFloat(updatedItems[index].qty) || 0;
//         const rate = parseFloat(updatedItems[index].rate) || 0;
//         const tax = parseFloat(updatedItems[index].tax) || 0;
//         updatedItems[index].amount = qty * rate + (qty * rate * tax) / 100;

//         setItems(updatedItems);
//     };

//     const handleDeleteItem = (index) => {
//         const updatedItems = items.filter((_, i) => i !== index);
//         setItems(updatedItems);
//     };

//     const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

//     const handleProceed = () => {
//         if (items.length === 0) {
//             toast.error("Please add at least one item before proceeding.");
//             return;
//         }
//         setShowModal(true);
//     };

//     const handleBillChange = (e) => {
//         setBillInfo({
//             ...billInfo,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleBillSubmit = () => {
//         if (!billInfo.billTo || !billInfo.subject) {
//             toast.error("Please fill all the details.");
//             return;
//         }
//         setShowModal(false);
//         navigate("/dashboard/proposal-preview", { state: { billInfo, items, totalAmount } });
//     };

//     return (
//         <div className="p-6 max-w-6xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Proposal Form</h1>

//             {/* Input Form */}
//             <div className="grid grid-cols-5 gap-3 mb-4">
//                 <input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Item Name"
//                     className="border p-2 rounded"
//                 />
//                 <input
//                     name="qty"
//                     type="number"
//                     value={formData.qty}
//                     onChange={handleChange}
//                     placeholder="Quantity"
//                     className="border p-2 rounded"
//                 />
//                 <input
//                     name="rate"
//                     type="number"
//                     value={formData.rate}
//                     onChange={handleChange}
//                     placeholder="Rate"
//                     className="border p-2 rounded"
//                 />
//                 <input
//                     name="tax"
//                     type="number"
//                     value={formData.tax}
//                     onChange={handleChange}
//                     placeholder="Tax (%)"
//                     className="border p-2 rounded"
//                 />
//                 <button
//                     onClick={handleAddItem}
//                     className="bg-blue-600 text-white rounded px-4 hover:bg-blue-700"
//                 >
//                     Add Item
//                 </button>
//             </div>

//             {/* Items Table */}
//             {items.length > 0 && (
//                 <>
//                     <table className="w-full border-collapse border border-gray-300 mb-4">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="border p-2">#</th>
//                                 <th className="border p-2">Item Name</th>
//                                 <th className="border p-2">Qty</th>
//                                 <th className="border p-2">Rate</th>
//                                 <th className="border p-2">Tax (%)</th>
//                                 <th className="border p-2">Amount (AED)</th>
//                                 <th className="border p-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {items.map((item, index) => (
//                                 <tr key={index}>
//                                     <td className="border p-2 text-center">{index + 1}</td>
//                                     <td className="border p-2">
//                                         <input
//                                             value={item.name}
//                                             onChange={(e) =>
//                                                 handleEditItem(index, "name", e.target.value)
//                                             }
//                                             className="w-full border rounded p-1"
//                                         />
//                                     </td>
//                                     <td className="border p-2">
//                                         <input
//                                             type="number"
//                                             value={item.qty}
//                                             onChange={(e) =>
//                                                 handleEditItem(index, "qty", e.target.value)
//                                             }
//                                             className="w-full border rounded p-1 text-center"
//                                         />
//                                     </td>
//                                     <td className="border p-2">
//                                         <input
//                                             type="number"
//                                             value={item.rate}
//                                             onChange={(e) =>
//                                                 handleEditItem(index, "rate", e.target.value)
//                                             }
//                                             className="w-full border rounded p-1 text-center"
//                                         />
//                                     </td>
//                                     <td className="border p-2">
//                                         <input
//                                             type="number"
//                                             value={item.tax}
//                                             onChange={(e) =>
//                                                 handleEditItem(index, "tax", e.target.value)
//                                             }
//                                             className="w-full border rounded p-1 text-center"
//                                         />
//                                     </td>
//                                     <td className="border p-2 text-right">
//                                         {item.amount.toFixed(2)}
//                                     </td>
//                                     <td className="border p-2 text-center">
//                                         <button
//                                             onClick={() => handleDeleteItem(index)}
//                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot>
//                             <tr className="font-semibold bg-gray-100">
//                                 <td colSpan="6" className="border p-2 text-right">
//                                     Total
//                                 </td>
//                                 <td className="border p-2 text-right">
//                                     {totalAmount.toFixed(2)}
//                                 </td>
//                             </tr>
//                         </tfoot>
//                     </table>

//                     <div className="text-right">
//                         <button
//                             onClick={handleProceed}
//                             className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
//                         >
//                             Proceed
//                         </button>
//                     </div>
//                 </>
//             )}

//             {/* Modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//                     <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
//                         <h2 className="text-xl font-semibold mb-4">Bill Information</h2>

//                         <label className="block mb-2 font-medium">Bill To:</label>
//                         <textarea
//                             name="billTo"
//                             value={billInfo.billTo}
//                             onChange={handleBillChange}
//                             placeholder="e.g. Mr. Nikolay Kolomiychenko, TH01 Creek Harbour Gate Tower 2 TH01 Dubai United Arab Emirates"
//                             className="border rounded w-full p-2 mb-4 h-24"
//                         />

//                         <label className="block mb-2 font-medium">Subject:</label>
//                         <input
//                             name="subject"
//                             value={billInfo.subject}
//                             onChange={handleBillChange}
//                             placeholder="e.g. New Additional Works of the TH1 in Creek Harbour as of 31.12.2024"
//                             className="border rounded w-full p-2 mb-4"
//                         />

//                         <div className="flex justify-end gap-3">
//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleBillSubmit}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProposalForm;




import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProposalForm = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    qty: "",
    rate: "",
    tax: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [billInfo, setBillInfo] = useState({
    billTo: "",
    subject: "",
    estimateNo: "",
    estimateDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddItem = () => {
    if (!formData.name || !formData.qty || !formData.rate || !formData.tax) {
      toast.error("Please fill all the fields.");
      return;
    }

    const qty = parseFloat(formData.qty);
    const rate = parseFloat(formData.rate);
    const tax = parseFloat(formData.tax);
    const amount = qty * rate + (qty * rate * tax) / 100;

    setItems([...items, { ...formData, amount }]);
    setFormData({ name: "", qty: "", rate: "", tax: "" });
  };

  const handleEditItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const qty = parseFloat(updatedItems[index].qty) || 0;
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const tax = parseFloat(updatedItems[index].tax) || 0;
    updatedItems[index].amount = qty * rate + (qty * rate * tax) / 100;

    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);

  const handleProceed = () => {
    if (items.length === 0) {
      toast.error("Please add at least one item before proceeding.");
      return;
    }
    setShowModal(true);
  };

  const handleBillChange = (e) => {
    setBillInfo({
      ...billInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleBillSubmit = () => {
    const { billTo, subject, estimateNo, estimateDate } = billInfo;

    if (!billTo || !subject || !estimateNo || !estimateDate) {
      toast.error("Please fill all the fields.");
      return;
    }

    setShowModal(false);
    navigate("/dashboard/proposal-preview", {
      state: { billInfo, items, totalAmount },
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Proposal Form</h1>

      {/* Input Form */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="border p-2 rounded"
        />
        <input
          name="qty"
          type="number"
          value={formData.qty}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded"
        />
        <input
          name="rate"
          type="number"
          value={formData.rate}
          onChange={handleChange}
          placeholder="Rate"
          className="border p-2 rounded"
        />
        <input
          name="tax"
          type="number"
          value={formData.tax}
          onChange={handleChange}
          placeholder="Tax (%)"
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 "
        >
          Add Item
        </button>
      </div>

      {/* Items Table */}
      {items.length > 0 && (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Item Name</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">Rate</th>
                <th className="border p-2">Tax (%)</th>
                <th className="border p-2">Amount (AED)</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      value={item.name}
                      onChange={(e) =>
                        handleEditItem(index, "name", e.target.value)
                      }
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleEditItem(index, "qty", e.target.value)
                      }
                      className="w-full border rounded p-1 text-center"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleEditItem(index, "rate", e.target.value)
                      }
                      className="w-full border rounded p-1 text-center"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.tax}
                      onChange={(e) =>
                        handleEditItem(index, "tax", e.target.value)
                      }
                      className="w-full border rounded p-1 text-center"
                    />
                  </td>
                  <td className="border p-2 text-right">
                    {item.amount.toFixed(2)}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold bg-gray-100">
                <td colSpan="6" className="border p-2 text-right">
                  Total
                </td>
                <td className="border p-2 text-right">
                  {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="text-right">
            <button
              onClick={handleProceed}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Proceed
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Bill Information</h2>

            {/* Estimate Number */}
            <label className="block mb-2 font-medium">Estimate Number:</label>
            <input
              name="estimateNo"
              value={billInfo.estimateNo}
              onChange={handleBillChange}
              placeholder="e.g. EST-002065"
              className="border rounded w-full p-2 mb-4"
            />

            {/* Estimate Date */}
            <label className="block mb-2 font-medium">Estimate Date:</label>
            <input
              name="estimateDate"
              type="date"
              value={billInfo.estimateDate}
              onChange={handleBillChange}
              className="border rounded w-full p-2 mb-4"
            />

            {/* Bill To */}
            <label className="block mb-2 font-medium">Bill To:</label>
            <textarea
              name="billTo"
              value={billInfo.billTo}
              onChange={handleBillChange}
              placeholder="e.g. Mr. Nikolay Kolomiychenko, TH01 Creek Harbour Gate Tower 2 TH01 Dubai United Arab Emirates"
              className="border rounded w-full p-2 mb-4 h-24"
            />

            {/* Subject */}
            <label className="block mb-2 font-medium">Subject:</label>
            <input
              name="subject"
              value={billInfo.subject}
              onChange={handleBillChange}
              placeholder="e.g. New Additional Works of the TH1 in Creek Harbour as of 31.12.2024"
              className="border rounded w-full p-2 mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleBillSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalForm;
