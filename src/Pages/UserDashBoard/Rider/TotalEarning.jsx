// TotalEarning.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import useAxiosSecure from '../../../Hook/UseAxiosSecure';
import AuthUser from '../../../Hook/AuthUser';

const TotalEarning = () => {
  const { user } =AuthUser();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: earnings = [], isLoading } = useQuery({
    queryKey: ['rider-earnings'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels-earning?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const withdrawAllMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/rider/withdraw-all?email=${user?.email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'All pending earnings withdrawn.', 'success');
      queryClient.invalidateQueries(['rider-earnings']);
    },
    onError: () => {
      Swal.fire('Error!', 'Withdrawal failed.', 'error');
    },
  });

  const filterAndSum = (days) => {
    const now = dayjs();
    const pastDate = now.subtract(days, 'day');
    return earnings
      .filter((item) => dayjs(item.pickedAt).isAfter(pastDate))
      .reduce((sum, item) => sum + item.earning, 0);
  };

  const today = dayjs().format('YYYY-MM-DD');
  const todayEarning = earnings
    .filter((item) => dayjs(item.pickedAt).format('YYYY-MM-DD') === today)
    .reduce((sum, item) => sum + item.earning, 0);

  const last7DaysEarning = filterAndSum(7);
  const last30DaysEarning = filterAndSum(30);
  const last365DaysEarning = filterAndSum(365);

  const pending = earnings.filter((e) => !e.withdrawn);
  const withdrawn = earnings.filter((e) => e.withdrawn);

  const pendingTotal = pending.reduce((sum, item) => sum + item.earning, 0);
  const withdrawnTotal = withdrawn.reduce((sum, item) => sum + item.earning, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Total Earnings Summary</h2>
      {isLoading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-100 shadow-md p-5 rounded-xl">
              <h3 className="text-xl font-semibold">Today</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">৳ {todayEarning.toFixed(2)}</p>
            </div>
            <div className="bg-blue-100 shadow-md p-5 rounded-xl">
              <h3 className="text-xl font-semibold">Last 7 Days</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">৳ {last7DaysEarning.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-100 shadow-md p-5 rounded-xl">
              <h3 className="text-xl font-semibold">Last 30 Days</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">৳ {last30DaysEarning.toFixed(2)}</p>
            </div>
            <div className="bg-purple-100 shadow-md p-5 rounded-xl">
              <h3 className="text-xl font-semibold">Last 1 Year</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">৳ {last365DaysEarning.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-red-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Pending Earnings</h3>
              <p className="text-3xl text-red-600 font-extrabold mb-4">৳ {pendingTotal.toFixed(2)}</p>
              <button
                onClick={() => {
                  Swal.fire({
                    title: 'Withdraw All?',
                    text: 'Do you want to withdraw all your pending earnings?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, withdraw all!'
                  }).then((result) => {
                    if (result.isConfirmed) withdrawAllMutation.mutate();
                  });
                }}
                disabled={pendingTotal === 0}
                className="btn btn-error"
              >
                Withdraw All
              </button>
            </div>
            <div className="bg-indigo-100 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2">Withdrawn Earnings</h3>
              <p className="text-3xl text-indigo-600 font-extrabold">৳ {withdrawnTotal.toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TotalEarning;
