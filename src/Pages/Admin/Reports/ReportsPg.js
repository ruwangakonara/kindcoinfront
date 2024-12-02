import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import classes from "./ReportsPg.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
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
  const [users, setUsers] = useState([]);
  const [donationData, setDonationData] = useState(null);
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [reportData, setReportData] = useState(null);

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

  const fetchUsers = () => {
    axios
      .get("http://localhost:9013/admin/view/reports/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data");
        setError("Error fetching the user report");
        setLoading(false);
      });
  };

  const fetchBeneficiaries = () => {
    axios
      .get("http://localhost:9013/admin/view/reports/beneficiaries")
      .then((response) => {
        setBeneficiaryData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data");
        setError("Error fetching the user report");
        setLoading(false);
      });
  };

  // var donationData = [
  //   {
  //     donation_id: "1234",
  //     title: "School Supplies Donation",
  //     description: "Donation for underprivileged children",
  //     amount: 100,
  //     value: 120,
  //     donation_date: new Date().toISOString(),
  //     donorDetails: { name: "John Doe", email: "john@example.com" },
  //     phone: "123-456-7890",
  //     created: new Date().toISOString(),
  //     verified: true,
  //     rewarded: false,
  //     attestation_fee: 10,
  //     images: ["image1.png", "image2.png"],
  //   },
  //   {
  //     donation_id: "1234",
  //     title: "School Supplies Donation",
  //     description: "Donation for underprivileged children",
  //     amount: 100,
  //     value: 120,
  //     donation_date: new Date().toISOString(),
  //     donorDetails: { name: "John Doe", email: "john@example.com" },
  //     phone: "123-456-7890",
  //     created: new Date().toISOString(),
  //     verified: true,
  //     rewarded: false,
  //     attestation_fee: 10,
  //     images: ["image1.png", "image2.png"],
  //   },
  // ];

  // const donationData = [
  //   {
  //     donation_id: "674d29b137098745dac47a87",
  //     type: "goods",
  //     created: "2024-12-02T03:29:53.053+00:00",
  //     rewarded: false,
  //     value: 100,
  //     token_amount: 50,
  //     xlmToLkrRate: 230,
  //     tokenToXlmRate: 0.5,
  //     donation_date: "2024-11-01T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 12.5,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a88",
  //     type: "monetary",
  //     created: "2024-11-28T04:18:45.000+00:00",
  //     rewarded: true,
  //     value: 200,
  //     token_amount: 100,
  //     xlmToLkrRate: 240,
  //     tokenToXlmRate: 0.4,
  //     donation_date: "2024-10-15T00:00:00.000+00:00",
  //     attest_obtained: false,
  //     attestation_fee: 25,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a89",
  //     type: "goods",
  //     created: "2024-11-20T06:45:10.000+00:00",
  //     rewarded: false,
  //     value: 150,
  //     token_amount: 75,
  //     xlmToLkrRate: 220,
  //     tokenToXlmRate: 0.6,
  //     donation_date: "2024-09-25T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 18.75,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a90",
  //     type: "monetary",
  //     created: "2024-11-18T09:30:00.000+00:00",
  //     rewarded: false,
  //     value: 300,
  //     token_amount: 150,
  //     xlmToLkrRate: 250,
  //     tokenToXlmRate: 0.45,
  //     donation_date: "2024-08-30T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 37.5,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a91",
  //     type: "goods",
  //     created: "2024-11-10T12:15:20.000+00:00",
  //     rewarded: true,
  //     value: 50,
  //     token_amount: 25,
  //     xlmToLkrRate: 230,
  //     tokenToXlmRate: 0.55,
  //     donation_date: "2024-07-25T00:00:00.000+00:00",
  //     attest_obtained: false,
  //     attestation_fee: 6.25,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a92",
  //     type: "monetary",
  //     created: "2024-12-01T15:40:00.000+00:00",
  //     rewarded: true,
  //     value: 500,
  //     token_amount: 250,
  //     xlmToLkrRate: 220,
  //     tokenToXlmRate: 0.35,
  //     donation_date: "2024-06-10T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 62.5,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a93",
  //     type: "goods",
  //     created: "2024-11-15T16:30:45.000+00:00",
  //     rewarded: false,
  //     value: 400,
  //     token_amount: 200,
  //     xlmToLkrRate: 240,
  //     tokenToXlmRate: 0.5,
  //     donation_date: "2024-05-01T00:00:00.000+00:00",
  //     attest_obtained: false,
  //     attestation_fee: 50,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a94",
  //     type: "monetary",
  //     created: "2024-11-05T14:05:30.000+00:00",
  //     rewarded: true,
  //     value: 150,
  //     token_amount: 75,
  //     xlmToLkrRate: 235,
  //     tokenToXlmRate: 0.47,
  //     donation_date: "2024-04-10T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 18.75,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a95",
  //     type: "goods",
  //     created: "2024-10-22T11:25:10.000+00:00",
  //     rewarded: false,
  //     value: 350,
  //     token_amount: 175,
  //     xlmToLkrRate: 215,
  //     tokenToXlmRate: 0.6,
  //     donation_date: "2024-03-20T00:00:00.000+00:00",
  //     attest_obtained: false,
  //     attestation_fee: 43.75,
  //   },
  //   {
  //     donation_id: "674d29b137098745dac47a96",
  //     type: "monetary",
  //     created: "2024-09-01T08:00:00.000+00:00",
  //     rewarded: false,
  //     value: 600,
  //     token_amount: 300,
  //     xlmToLkrRate: 230,
  //     tokenToXlmRate: 0.55,
  //     donation_date: "2024-02-15T00:00:00.000+00:00",
  //     attest_obtained: true,
  //     attestation_fee: 75,
  //   },
  // ];

  const generateDonationsPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Donation Report", 14, 22);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

    // Check if donation data exists
    if (donationData && donationData.length > 0) {
      // Add donation table with required fields
      doc.autoTable({
        startY: 40,
        head: [
          [
            "Donation ID",
            "Type",
            "Created",
            "Rewarded",
            "Value",
            "Token Amount",
            "XLM to LKR Rate",
            "Token to XLM Rate",
            "Donation Date",
            "Attest Obtained",
            "Attestation Fee",
          ],
        ],
        body: donationData.map((donation) => [
          donation.donation_id,
          donation.type,
          new Date(donation.created).toLocaleDateString(),
          donation.rewarded ? "Yes" : "No",
          donation.value,
          donation.token_amount,
          donation.xlmToLkrRate,
          donation.tokenToXlmRate,
          new Date(donation.donation_date).toLocaleDateString(),
          donation.attest_obtained ? "Yes" : "No",
          donation.attestation_fee,
        ]),
        theme: "grid",
        styles: { fontSize: 10 },
        margin: { top: 10 },
      });
    } else {
      doc.text("No donation data available", 14, 40);
    }

    // Save the PDF
    doc.save("donations_report.pdf");
  };

  // Function to generate the PDF report
  const generateUserReport = () => {
    const doc = new jsPDF();

    // Add Title (Centered and Bold)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("User Report", 105, 22, null, null, "center");

    // Add Date (Right aligned)
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Generated on: " + new Date().toLocaleDateString(),
      200,
      30,
      null,
      null,
      "right"
    );

    // Add a line under the title
    doc.setLineWidth(0.5);
    doc.line(14, 28, 200, 28);

    // Summarize user types
    const userTypes = users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {});

    // Add User Type Summary (Bold for titles)
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("User Type Summary:", 14, 40);

    let yOffset = 50;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    for (const [status, count] of Object.entries(userTypes)) {
      doc.text(`${status}: ${count} users`, 14, yOffset);
      yOffset += 10; // Increment y offset for the next line
    }

    // Add a separator
    doc.line(14, yOffset, 200, yOffset);
    yOffset += 10;

    // Add User Details Table Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("User ID", 14, yOffset);
    doc.text("User Type", 70, yOffset);
    yOffset += 10;

    // Add table rows with alternating shading
    users.forEach((user, index) => {
      const rowY = yOffset + index * 10;

      // Alternate row background shading (light gray)
      if (index % 2 === 0) {
        doc.setFillColor(240, 240, 240); // Light Gray
        doc.rect(14, rowY - 8, 180, 10, "F");
      }

      // User ID and Status
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(user._id, 14, rowY);
      doc.text(user.status, 70, rowY);
    });

    // Add final line separator at the bottom
    yOffset += users.length * 10 + 10;
    doc.line(14, yOffset, 200, yOffset);

    // Save the PDF
    doc.save("user_report.pdf");
  };

  const generatePdfBeneficiary = () => {
    if (!Array.isArray(beneficiaryData) || beneficiaryData.length === 0) {
      alert("No beneficiaries found");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica");

    // Set Title for the PDF
    doc.setFontSize(18);
    doc.text("Beneficiary Report", 14, 20);

    // Table Headers
    doc.setFontSize(12);
    const headers = [
      "Username",
      "District",
      "Phone No",
      "Verified",
      "Status",
      "Created At",
      "Raised Amount",
    ];
    let startY = 30;
    const margin = 10;
    const rowHeight = 10;

    // Draw the headers
    headers.forEach((header, index) => {
      doc.text(header, margin + index * 30, startY);
    });

    // Draw the data rows
    beneficiaryData.forEach((beneficiary, index) => {
      const y = startY + (index + 1) * rowHeight;
      doc.text(beneficiary.username, margin, y);
      doc.text(beneficiary.district, margin + 30, y);
      doc.text(beneficiary.phoneNo, margin + 60, y);
      doc.text(beneficiary.verified ? "Yes" : "No", margin + 90, y);
      doc.text(beneficiary.status, margin + 120, y);
      doc.text(
        new Date(beneficiary.created_at).toLocaleDateString(),
        margin + 150,
        y
      );
      doc.text(beneficiary.raised_amount.toString(), margin + 180, y);
    });

    // Save the PDF document
    doc.save("Beneficiary_Report.pdf");
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
    fetchDonations();
    fetchUsers();
    fetchBeneficiaries();
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
            "ID",
            // "Title",
            // "Description",
            "Amount",
            "Value",
            "Donation Date",
            // "Donor Name",
            // "Donor Email",
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
          // donation.title,
          // donation.description,
          donation.amount,
          donation.value,
          new Date(donation.donation_date).toLocaleDateString(),
          // donation.donorDetails.name,
          // donation.donorDetails.email,
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
            <div className={classes.buttonContainer}>
              <button
                onClick={generateUserReport}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get User Report
              </button>
              <button
                // onClick={generateDonationsReport}
                onClick={generateDonationsPDF}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get Donations Report
              </button>
              <button
                // onClick={generateDonationsReport}
                onClick={generatePdfBeneficiary}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get Beneficiaries Report
              </button>
              {/* <button
                onClick={generateDonationsReport}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get Donations Report
              </button> */}
            </div>
          </DefaultDashCmp>
        </div>
      </div>
    </>
  );
};

export default ReportsPg;
