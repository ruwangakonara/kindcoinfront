import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import classes from "./ReportsPg.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For tables
// import generateUserPDF from "./GenerativeFunctions";

/**
 *
 * Data for reports
 * All donations should be displayed as a table. end of it have to have a report button.
 *
 *
 */

const ReportsPg = () => {
  // const [users, setUsers] = useState([]);
  // const [reportData, setReportData] = useState(null);
  const [donationData, setDonationData] = useState(null);
  // const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDonations = () => {
    axios
      .get("http://localhost:9013/admin/view/reports/donationSummary")
      .then((response) => {
        setDonationData(response.data);
        console.log(setDonationData(response.data));
        // console.log(response.data); //
        console.log(donationData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data");
        setError("Error fetching the user report");
        setLoading(false);
      });
  };

  // Fetch data from the backend
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:9013/admin/view/reports/users")
  //     .then((response) => {
  //       setUsers(response.data);
  //       console.log(setUsers(response.data));
  //       // console.log(response.data); //
  //       console.log(users);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data");
  //       setError("Error fetching the user report");
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    // const fetchUsers = axios.get(
    //   "http://localhost:9013/admin/view/reports/users"
    // );

    // const fetchReportSummary = axios.get(
    //   "http://localhost:9013/admin/view/reports/summary"
    // );

    // const fetchDonors = axios.get(
    //   "http://localhost:9013/admin/Donor_List/Donors"
    // );

    // const fetchBeneficiaries = axios.get(
    //   "http://localhost:9013/admin/Donor_List/Donors"
    // );

    // const fetchDonationSummary = axios.get(
    //   "http://localhost:9013/admin/view/reports/donationSummary"
    // );

    // Promise.all([
    //   // fetchUsers,
    //   // fetchReportSummary,
    //   // fetchDonors,
    //   // fetchBeneficiaries,
    //   fetchDonationSummary,
    // ])
    //   .then(
    //     ([
    //       // usersResponse,
    //       // reportResponse,
    //       // beneficiariesResponse,
    //       donationsResponse,
    //     ]) => {
    //       // setUsers(usersResponse.data);
    //       // setReportData(reportResponse.data);
    //       setDonationData(donationsResponse.data);
    //       // setBeneficiaryData(beneficiariesResponse.data);
    //       setLoading(false);
    //     }
    //   )
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setError("Error fetching the user report and summary");
    //     setLoading(false);
    //   });
    fetchDonations();
  }, []);

  // const generateSummary = () => {
  //   const doc = new jsPDF();

  //   // Add Title to the Report
  //   doc.setFontSize(18);
  //   doc.text("Donation Report", 14, 22);

  //   // Add Date to the Report
  //   doc.setFontSize(12);
  //   doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

  //   // Safely check if reportData and its properties exist
  //   if (
  //     reportData &&
  //     reportData.beneficiaries &&
  //     reportData.beneficiaries.length > 0
  //   ) {
  //     // Add Beneficiary Table
  //     doc.autoTable({
  //       startY: 40,
  //       head: [["Beneficiary Name", "Username", "Phone No", "Status"]],
  //       body: reportData.beneficiaries.map((beneficiary) => [
  //         beneficiary.name,
  //         beneficiary.username,
  //         beneficiary.phoneNo,
  //         beneficiary.status,
  //       ]),
  //       theme: "grid",
  //       styles: { fontSize: 10 },
  //       margin: { top: 10 },
  //     });
  //   }

  //   // Safely check if donors exist
  //   if (reportData && reportData.donors && reportData.donors.length > 0) {
  //     // Add Donor Table
  //     doc.autoTable({
  //       startY: doc.autoTable.previous.finalY + 10, // Space from previous table
  //       head: [["Donor Name", "Username", "Phone No", "Total Donations"]],
  //       body: reportData.donors.map((donor) => [
  //         donor.name,
  //         donor.username,
  //         donor.phoneNo,
  //         donor.donated,
  //       ]),
  //       theme: "grid",
  //       styles: { fontSize: 10 },
  //     });
  //   }

  //   // Safely check if donations exist
  //   if (reportData && reportData.donations && reportData.donations.length > 0) {
  //     // Add Donation Summary
  //     doc.setFontSize(12);
  //     doc.text("Donation Summary", 14, doc.autoTable.previous.finalY + 10);

  //     const donationSummary = reportData.donations.reduce(
  //       (acc, donation) => {
  //         acc.totalDonations += donation.value;
  //         acc.totalDonors += 1;
  //         return acc;
  //       },
  //       { totalDonations: 0, totalDonors: 0 }
  //     );

  //     doc.text(
  //       `Total Donations: ${donationSummary.totalDonations} LKR`,
  //       14,
  //       doc.autoTable.previous.finalY + 20
  //     );
  //     doc.text(
  //       `Total Donors: ${donationSummary.totalDonors}`,
  //       14,
  //       doc.autoTable.previous.finalY + 30
  //     );
  //   }

  //   // Add Footer
  //   doc.setFontSize(8);
  //   doc.text(
  //     "Report generated by: Your System",
  //     14,
  //     doc.internal.pageSize.height - 20
  //   );

  //   // Save the document
  //   doc.save("donation_report.pdf");
  // };

  //   const pdf = generateUserPDF(users);

  // Function to generate the PDF
  // const generateUserPDF = () => {
  //   const doc = new jsPDF();

  //   // Set the background color
  //   doc.setFillColor(173, 216, 230); // Light Blue color (RGB format)
  //   doc.rect(0, 0, 210, 297, "F"); // Fill the entire page with the background color
  //   // Add Title
  //   doc.setFontSize(22);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("User Report", 105, 15, { align: "center" });

  //   // Add table headers
  //   doc.setFontSize(12);
  //   doc.setFont("helvetica", "bold");
  //   doc.setTextColor(0); // black color
  //   doc.text("User Id", 10, 30);
  //   doc.text("UserName", 50, 30);
  //   doc.text("Password", 90, 30);
  //   doc.text("Status", 130, 30);
  //   doc.text("Active", 170, 30);

  //   // Draw a horizontal line under headers
  //   doc.line(10, 32, 200, 32); // from (x1, y1) to (x2, y2)

  //   // Add user data to the PDF
  //   let y = 40; // Initial Y-axis position for user data
  //   doc.setFont("helvetica", "normal"); // Regular font for user data
  //   users.forEach((user, index) => {
  //     doc.text(String(user._id), 10, y);
  //     doc.text(user.username, 50, y);
  //     doc.text(user.password, 90, y);
  //     doc.text(user.status, 130, y);
  //     doc.text(user.isEthical ? "Yes" : "No", 170, y); // Active status as Yes/No

  //     // Draw a horizontal line after each row (optional for styling)
  //     doc.line(10, y + 2, 200, y + 2);

  //     y += 10; // Move to the next line
  //   });

  //   // Add page footer (Optional)
  //   doc.setFontSize(10);
  //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 290); // Footer with date
  //   doc.text("Page 1", 200, 290, { align: "right" });

  //   // Save the PDF
  //   doc.save("user_report.pdf");
  // };

  const generateDonationsReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Donations with Donor Details", 14, 22);

    if (donationData && donationData.length > 0) {
      doc.autoTable({
        startY: 40,
        head: [
          [
            "Donation ID",
            "Title",
            "Description",
            "Amount",
            "Value",
            "Donation Date",
            "Donor Name",
            "Donor Email",
            "Phone",
            "Created",
            "Verified",
            "Rewarded",
            "Attestation Fee",
            "Images",
          ],
        ],
        body: donationData.map((donation) => [
          donation.donation_id,
          donation.title,
          donation.description,
          donation.amount,
          donation.value,
          new Date(donation.donation_date).toLocaleDateString(),
          donation.donorDetails.name,
          donation.donorDetails.email,
          donation.phone,
          new Date(donation.created).toLocaleDateString(),
          donation.verified ? "Yes" : "No",
          donation.rewarded ? "Yes" : "No",
          donation.attestation_fee,
          donation.images.join(", "), // Assuming images are in an array
        ]),
        theme: "grid",
        styles: { fontSize: 10 },
        margin: { top: 10 },
      });
    }

    doc.save("donations_report.pdf");
  };

  //   if (loading) return <div>Loading report...</div>;
  //   if (error) return <div>{error}</div>;
  return (
    <>
      <HeaderCmp />
      <div className={classes.mainContainer}>
        <AdminSideBarCmp />
        <div className={classes.content}>
          <DefaultDashCmp>
            <h1 style={{ textAlign: "center" }}>Generated Reports</h1>
            {/* <button
              onClick={generateUserPDF}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Get User Report
            </button> */}
            {/* <button
              onClick={generateSummary}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Get Summary Report
            </button> */}
            <button
              onClick={generateDonationsReport}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Get Donations Report
            </button>
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default ReportsPg;
