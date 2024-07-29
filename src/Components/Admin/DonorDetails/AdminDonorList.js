import React from 'react';
// import classes from "./AdminDonorList.module.css"

const AdminDonorList = () => {
  const rows = [
    { name: 'Giacomo Guilizzoni', jobTitle: 'Founder & CEO', age: 40, nickname: 'Peldi', employee: true },
    { name: 'Marco Botton', jobTitle: 'Tuttofare', age: 38, nickname: 'Patata', employee: true },
    { name: 'Mariah Maclachlan', jobTitle: 'Better Half', age: 41, nickname: '', employee: false },
    { name: 'Valerie Liberty', jobTitle: 'Head Chef', age: 34, nickname: 'Val', employee: true },
  ];

  return (
      <div className="donor-list">
        <h1>Admin Donor List</h1>
      </div>
  );
};

export default AdminDonorList;