import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import AuthUser from "../Hook/AuthUser";
import useAxiosSecure from "../Hook/UseAxiosSecure";
import animationData from "../assets/animations/rider.json"
import Lottie from "lottie-react";

const RiderApplicationForm = () => {
  const { user } = AuthUser();
  const axiosSecure = useAxiosSecure();
  const districts = useLoaderData();

  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const application = {
      ...data,
      email: user.email,
      name: user.displayName,
      role: "user",
      status: "pending",
      create_at: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/riders", application);
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err?.response?.data?.message || "You cannot apply again.",
      });
    }
  };
  const uniqueRegions = [...new Set(districts.map((d) => d.region))];
  const filteredDistricts = districts.filter(
    (d) => d.region === selectedRegion
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📝 Left side form */}
        <div>
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-2">Be a Rider</h2>
          <p className="text-gray-500 mb-6">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <hr className="mb-6" />

          <h3 className="text-xl font-semibold mb-4">Tell us about yourself</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Your Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              {/* Age */}
              <div>
                <label className="label font-medium">Your Age</label>
                <input
                  type="number"
                  placeholder="Your age"
                  {...register("age", { required: true, min: 18 })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Email & Region */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Your Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div>
                <label className="label font-medium">Select Your Region</label>
                <select
                  {...register("region", { required: true })}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* NID & Contact */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">NID No</label>
                <input
                  type="text"
                  placeholder="NID"
                  {...register("nid", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label font-medium">Contact</label>
                <input
                  type="text"
                  placeholder="Contact"
                  {...register("phone", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Warehouse District */}
            <div>
              <label className="label font-medium">
                Which warehouse you want to work?
              </label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select warehouse</option>
                {filteredDistricts.map((d) => (
                  <option key={d.district} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 text-white w-full"
            >
              Submit
            </button>
          </form>
        </div>

        {/* 🛵 Rider image (desktop only) */}
        <div className="hidden md:flex items-center justify-center">
         <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default RiderApplicationForm;
