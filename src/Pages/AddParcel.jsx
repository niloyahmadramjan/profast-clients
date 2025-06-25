// AddParcel.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../Hook/UseAxiosSecure";

const AddParcel = () => {
  const districtsData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, setValue, reset } = useForm();

  const [senderAreas, setSenderAreas] = useState([]);
  const [receiverAreas, setReceiverAreas] = useState([]);
  const [parcelType, setParcelType] = useState("Document");

  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");

  // sender/receiver area set
  useEffect(() => {
    const sender = districtsData.find((d) => d.district === senderDistrict);
    setSenderAreas(sender?.covered_area || []);

    const receiver = districtsData.find((d) => d.district === receiverDistrict);
    setReceiverAreas(receiver?.covered_area || []);
  }, [senderDistrict, receiverDistrict, districtsData]);

  // generate tracking number
  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${timestamp}-${random}`;
  };

  const onSubmit = (data) => {
    const weight = parseFloat(data.parcelWeight);
    const isSameCity = data.senderDistrict === data.receiverDistrict;
    let cost = 0;
    let pricingExplanation = "";

    // Cost Calculation
    if (parcelType === "Document") {
      cost = isSameCity ? 60 : 80;
      pricingExplanation = isSameCity
        ? "Document Parcel → Within City → ৳60"
        : "Document Parcel → Outside City → ৳80";
    } else {
      if (weight <= 3) {
        cost = isSameCity ? 110 : 150;
        pricingExplanation = isSameCity
          ? "Non-Document Parcel (≤3kg) → Within City → ৳110"
          : "Non-Document Parcel (≤3kg) → Outside City → ৳150";
      } else {
        const extraKg = weight - 3;
        cost = (isSameCity ? 110 : 150) + extraKg * 40;
        if (!isSameCity) cost += 40;
        pricingExplanation = isSameCity
          ? `Non-Document Parcel (>3kg) → Within City → ৳110 + ৳40 x ${extraKg}kg = ৳${cost}`
          : `Non-Document Parcel (>3kg) → Outside City → ৳150 + ৳40 x ${extraKg}kg + ৳40 extra = ৳${cost}`;
      }
    }

    // Parcel Data
    const trackingNumber = generateTrackingNumber();

    const parcelData = {
      ...data,
      parcelType,
      cost,
      trackingNumber,
      status: "Pending",
      paymentStatus: "Unpaid",
    };

    // SweetAlert
    Swal.fire({
      title: "<strong>Parcel Booking Summary</strong>",
      html: `
      <div class="text-left text-base leading-relaxed space-y-2">
        <p><b>📦 Tracking Number:</b> <span style="color:#10b981;">${trackingNumber}</span></p>
        <p><b>📄 Parcel Type:</b> ${parcelType}</p>
        <p><b>💰 Total Cost:</b> <span style="color:#f97316; font-size: 1.2rem;">৳${cost}</span></p>

        <hr class="my-2">

        <h4 style="font-weight:bold; margin-bottom:5px;">🧮 Why this price?</h4>
        <p>${pricingExplanation}</p>

        <hr class="my-2">

        <h4 style="font-weight:bold; margin-bottom:5px;">📋 Pricing Structure:</h4>
        <ul style="list-style-type:disc; padding-left: 20px;">
          <li>Document (Any Weight) → Within City: ৳60</li>
          <li>Document (Any Weight) → Outside City: ৳80</li>
          <li>Non-Document (Up to 3kg) → Within City: ৳110</li>
          <li>Non-Document (Up to 3kg) → Outside City: ৳150</li>
          <li>Non-Document (>3kg) → ৳40 per extra kg</li>
          <li>Non-Document (>3kg) → Outside City extra: +৳40</li>
        </ul>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Continue to Payment",
      cancelButtonText: "Go Back to Edit",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("Final Parcel Data:", parcelData);

        // write code for post data server side

        axiosSecure
          .post("/parcels", parcelData)
          .then((result) => {
            if (result.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your parcel successfully added",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-4">Add Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Details */}
        <div className=" p-4 rounded-xl shadow bg-white space-y-4 mb-6">
          <h3 className="text-xl font-semibold">Enter your parcel details</h3>

          <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
            <label className=" shrink-0 flex items-center gap-2">
              <input
                type="radio"
                value="Document"
                checked={parcelType === "Document"}
                onChange={() => {
                  setParcelType("Document");
                  setValue("parcelWeight", "");
                }}
              />
              Document
            </label>
            <label className="shrink-0 flex items-center gap-2">
              <input
                type="radio"
                value="Non-Document"
                checked={parcelType === "Non-Document"}
                onChange={() => {
                  setParcelType("Non-Document");
                }}
              />
              Non-Document
            </label>

            <input
              {...register("parcelName")}
              placeholder="Parcel Name"
              className="input input-bordered w-full"
              required
            />
            <input
              {...register("parcelWeight")}
              placeholder="Parcel Weight (KG)"
              type="number"
              step="0.1"
              className={`input input-bordered w-full ${
                parcelType === "Document"
                  ? "bg-gray-200 cursor-not-allowed"
                  : ""
              }`}
              required
              disabled={parcelType === "Document"}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Sender Details */}
          <div className=" p-4 rounded-xl shadow bg-white space-y-4 ">
            <h3 className="text-xl font-semibold">Sender Details</h3>

            <input
              {...register("senderName")}
              placeholder="Sender Name"
              className="input input-bordered w-full"
              required
            />

            <select
              {...register("senderDistrict")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select District</option>
              {districtsData.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>

            <select
              {...register("senderArea")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Area</option>
              {senderAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <input
              {...register("senderContact")}
              placeholder="Sender Contact No"
              className="input input-bordered w-full"
              required
            />
            <textarea
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Receiver Details */}
          <div className=" p-4 rounded-xl shadow bg-white space-y-4">
            <h3 className="text-xl font-semibold">Receiver Details</h3>

            <input
              {...register("receiverName")}
              placeholder="Receiver Name"
              className="input input-bordered w-full"
              required
            />

            <select
              {...register("receiverDistrict")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select District</option>
              {districtsData.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>

            <select
              {...register("receiverArea")}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Area</option>
              {receiverAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <input
              {...register("receiverContact")}
              placeholder="Receiver Contact No"
              className="input input-bordered w-full"
              required
            />
            <textarea
              {...register("deliveryInstruction")}
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        <div className="md:col-span-2 text-center">
          <p className="text-sm text-gray-500 mb-2">
            * Pickup Time: 4pm - 7pm Approx.
          </p>
          <button type="submit" className="btn bg-lime-400 hover:bg-lime-500">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParcel;
