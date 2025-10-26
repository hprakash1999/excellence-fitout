

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/CompanyLogo/company-logo.png";

// const ProposalPreview = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const { billInfo, items, totalAmount } = state || {};

//   if (!state) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-600">No proposal data found.</p>
//         <button
//           onClick={() => navigate("/dashboard/proposal-form")}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative bg-gray-50 min-h-screen py-10 print:bg-white">
//       {/* --- Watermark --- */}
//       <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none print:opacity-10">
//         <img
//           src={logo}
//           alt="Watermark"
//           className="w-2/3 md:w-1/2 object-contain"
//         />
//       </div>

//       <div
//         id="proposal-pdf"
//         className="relative z-10 p-10 max-w-5xl mx-auto bg-white shadow-lg rounded-lg"
//       >
//         {/* Company Header */}
//         <div className="flex justify-between items-end border-b pb-4 mb-6">
//           {/* Logo and Info */}
//           <div className="flex flex-col items-start gap-3">
//             <img src={logo} alt="Company Logo" className="h-16 w-auto" />
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Excellence Interior & Contracting LLC
//               </h1>
//               <p className="text-gray-600 text-sm leading-snug">
//                 Dubai 941530, United Arab Emirates <br />
//                 TRN: 100290850500003 <br />
//                 Phone: +971552146089 | Email: info@excellenceinteriors.com,{" "}
//                 excellenceservices2024@gmail.com
//               </p>
//             </div>
//           </div>

//           {/* Estimate Info */}
//           <div className="flex flex-col justify-end text-right text-sm text-gray-700">
//             <p className="font-semibold text-lg tracking-wide">ESTIMATE</p>
//             <p>
//               Estimate #:{" "}
//               <span className="font-medium text-gray-900">
//                 {billInfo.estimateNo}
//               </span>
//             </p>
//             <p>
//               Date:{" "}
//               <span className="font-medium text-gray-900">
//                 {billInfo.estimateDate}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Bill Info */}
//         <div className="mb-6">
//           <h2 className="font-semibold text-lg mb-1 text-gray-800">Bill To:</h2>
//           <p className="whitespace-pre-line p-3 bg-gray-50 rounded border text-gray-700">
//             {billInfo.billTo}
//           </p>

//           <h2 className="font-semibold text-lg mt-4 mb-1 text-gray-800">
//             Subject:
//           </h2>
//           <p className="p-3 bg-gray-50 rounded border text-gray-700">
//             {billInfo.subject}
//           </p>
//         </div>

//         {/* Items Table */}
//         <div className="overflow-hidden ">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className=" text-left border-y border-gray-200 bg-zinc-600 text-white">
//                 <th className="p-3 font-semibold w-8">#</th>
//                 <th className="p-3 font-semibold w-32">Item & Description</th>
//                 <th className="p-3 font-semibold text-center w-22">Qty</th>
//                 <th className="p-3 font-semibold text-center w-28">Rate</th>
//                 <th className="p-3 font-semibold text-center w-24">Tax (%)</th>
//                 <th className="p-3 font-semibold text-right w-32">Amount (AED)</th>
//               </tr>
//             </thead>
//             <tbody >
//               {items.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-gray-100 transition-colors border-y`}
//                 >
//                   <td className="p-3 text-center text-gray-700">{index + 1}</td>
//                   <td className="p-3 text-gray-700">{item.name}</td>
//                   <td className="p-3 text-center text-gray-700">{item.qty}</td>
//                   <td className="p-3 text-center text-gray-700">{item.rate}</td>
//                   <td className="p-3 text-center text-gray-700">{item.tax}</td>
//                   <td className="p-3 text-right text-gray-900 font-medium">
//                     {item.amount.toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr className="bg-gray-100 font-semibold text-gray-800 border-y ">
//                 <td colSpan="5" className="p-3 text-right">
//                   Total
//                 </td>
//                 <td className="p-3 text-right text-gray-900">
//                   {totalAmount.toFixed(2)}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Footer Notes */}
//         <div className="mt-6 text-sm text-gray-700 leading-relaxed">
//           <p className="font-semibold mb-1 text-gray-800">Notes:</p>
//           <p>This quotation is valid for two weeks.</p>

//           <p className="font-semibold mt-3 mb-1 text-gray-800">
//             Terms & Conditions:
//           </p>
//           <ul className="list-disc list-inside space-y-1">
//             <li>50% Down Payment</li>
//             <li>30% upon completion of 50%</li>
//             <li>15% upon completion of 90%</li>
//             <li>5% upon completion of 100%</li>
//           </ul>
//         </div>

//         {/* Buttons */}
//         <div className="mt-8 flex justify-end gap-3 print:hidden">
//           <button
//             onClick={() => navigate("/dashboard/proposal-form")}
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Back to Edit
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Download / Print PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProposalPreview;







import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/CompanyLogo/company-logo.png";

const ProposalPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { billInfo, items, totalAmount } = state || {};

  if (!state) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No proposal data found.</p>
        <button
          onClick={() => navigate("/dashboard/proposal-form")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 min-h-screen py-10 print:bg-white">
      {/* --- Watermark --- */}
      <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none print:opacity-10">
        <img
          src={logo}
          alt="Watermark"
          className="w-2/3 md:w-1/2 object-contain"
        />
      </div>

      <div
        id="proposal-pdf"
        className="relative z-10 p-10 max-w-5xl mx-auto bg-white shadow-lg rounded-lg"
      >
        {/* Company Header */}
        <div className="flex justify-between items-end border-b pb-4 mb-6">
          {/* Logo and Info */}
          <div className="flex flex-col items-start gap-3">
            <img src={logo} alt="Company Logo" className="h-16 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Excellence Interior & Contracting LLC
              </h1>
              <p className="text-gray-600 text-sm leading-snug">
                Dubai 941530, United Arab Emirates <br />
                TRN: 100290850500003 <br />
                Phone: +971552146089 | Email: info@excellenceinteriors.com,{" "}
                excellenceservices2024@gmail.com
              </p>
            </div>
          </div>

          {/* Estimate Info */}
          <div className="flex flex-col justify-end text-right text-sm text-gray-700">
            <p className="font-semibold text-lg tracking-wide">ESTIMATE</p>
            <p className="flex flex-col">
              <span className="text-base text-gray-700 font-medium"> Estimate #:{" "}</span>
              <span className="font-medium text-sm text-gray-500">
                {billInfo.estimateNo}
              </span>
            </p>
            <p>
              Date:{" "}
              <span className="font-medium text-gray-900">
                {billInfo.estimateDate}
              </span>
            </p>
          </div>
        </div>

        {/* Bill Info */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-1 text-gray-800">Bill To:</h2>
          <p className="whitespace-pre-line p-3  text-gray-700">
            {billInfo.billTo}
          </p>

          <h2 className="font-semibold text-lg mt-4 mb-1 text-gray-800">
            Subject:
          </h2>
          <p className="p-3  text-gray-700">
            {billInfo.subject}
          </p>
        </div>

        {/* Items Table */}
        <div className="overflow-hidden">
          <table
            className="w-full text-sm border-collapse"
            style={{
              tableLayout: "fixed",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <thead>
              <tr
                className="text-left bg-zinc-700 text-white"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                  colorAdjust: "exact",
                }}
              >
                <th className="p-3 font-semibold w-5">#</th>
                <th className="p-3 font-semibold w-[40%]">Item & Description</th>
                <th className="p-3 font-semibold text-center w-[10%]">Qty</th>
                <th className="p-3 font-semibold text-center w-[15%]">Rate</th>
                <th className="p-3 font-semibold text-center w-[10%]">Tax (%)</th>
                <th className="p-3 font-semibold text-right w-[20%]">
                  Amount (AED)
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors border-b border-gray-300`}
                >
                  <td className="p-3 text-start text-gray-700">{index + 1}</td>
                  <td className="p-3 text-gray-700 break-words">
                    {item.name}
                  </td>
                  <td className="p-3 text-center text-gray-700">{item.qty}</td>
                  <td className="p-3 text-center text-gray-700">{item.rate}</td>
                  <td className="p-3 text-center text-gray-700">{item.tax}</td>
                  <td className="p-3 text-right text-gray-900 font-medium break-words">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr
                className="bg-gray-100 font-semibold text-gray-800 border-t"
                style={{
                  WebkitPrintColorAdjust: "exact",
                  printColorAdjust: "exact",
                  colorAdjust: "exact",
                }}
              >
                <td colSpan="5" className="p-3 text-right">
                  Total
                </td>
                <td className="p-3 text-right text-gray-900">
                  {totalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Footer Notes */}
        <div className="mt-6 text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold mb-1 text-gray-800">Notes:</p>
          <p>This quotation is valid for two weeks.</p>

          <p className="font-semibold mt-3 mb-1 text-gray-800">
            Terms & Conditions:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>50% Down Payment</li>
            <li>30% upon completion of 50%</li>
            <li>15% upon completion of 90%</li>
            <li>5% upon completion of 100%</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3 print:hidden">
          <button
            onClick={() => navigate("/dashboard/proposal-form")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Back to Edit
          </button>
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download / Print PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;
