import DefaultDashCmp from "../../../Components/Admin/DashboardComp/DefaultDashCmp";
import GridTypeDashCmp from "../../../Components/Admin/DashboardComp/GridTypeDashCmp";
import HeaderCmp from "../../../Components/Admin/Header/HeaderCmp";
import CardCmp from "../../../Components/Admin/NavigationCard/CardCmp";
import AdminSideBarCmp from "../../../Components/Admin/Sidebar/AdminSideBarCmp";
import classes from "./ReportsPg.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // For tables
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import html2canvas from "html2canvas";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
  // const [donationData, setDonationData] = useState(null);
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [reportData, setReportData] = useState(null);
  const [reportData, setReportData] = useState([
    { _id: "1", totalDonations: 5000, totalBeneficiaries: 3500 },
    { _id: "2", totalDonations: 7000, totalBeneficiaries: 4000 },
    { _id: "3", totalDonations: 3000, totalBeneficiaries: 2000 },
  ]);
  const chartRef = useRef(null);

  useEffect(() => {
    // fetchDonations();
    fetchUsers();
    fetchBeneficiaries();
  }, []);

  // const fetchDonations = () => {
  //   axios
  //     .get("http://localhost:9013/admin/view/reports/donationSummary")
  //     .then((response) => {
  //       setDonationData(response.data);
  //       console.log(setDonationData(response.data));
  //       // console.log(response.data); //
  //       console.log(donationData);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data");
  //       setError("Error fetching the user report");
  //       setLoading(false);
  //     });
  // };

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

  const donationData = [
    {
      donation_id: "674d29b137098745dac47a88",
      created: "2024-11-28T04:18:45.000+00:00",
      token_amount: 100,
      xlmToLkrRate: 240,
      tokenToXlmRate: 0.4,
      donation_date: "2024-10-15T00:00:00.000+00:00",
      attestation_fee: 25,
    },
    {
      donation_id: "674d29b137098745dac47a90",
      created: "2024-11-18T09:30:00.000+00:00",
      token_amount: 150,
      xlmToLkrRate: 250,
      tokenToXlmRate: 0.45,
      donation_date: "2024-08-30T00:00:00.000+00:00",
      attestation_fee: 37.5,
    },
    {
      donation_id: "674d29b137098745dac47a92",
      created: "2024-12-01T15:40:00.000+00:00",
      token_amount: 250,
      xlmToLkrRate: 220,
      tokenToXlmRate: 0.35,
      donation_date: "2024-06-10T00:00:00.000+00:00",
      attestation_fee: 62.5,
    },
    {
      donation_id: "674d29b137098745dac47a94",
      created: "2024-11-05T14:05:30.000+00:00",
      token_amount: 75,
      xlmToLkrRate: 235,
      tokenToXlmRate: 0.47,
      donation_date: "2024-04-10T00:00:00.000+00:00",
      attestation_fee: 18.75,
    },
    {
      donation_id: "674d29b137098745dac47a96",
      created: "2024-09-01T08:00:00.000+00:00",
      token_amount: 300,
      xlmToLkrRate: 230,
      tokenToXlmRate: 0.55,
      donation_date: "2024-02-15T00:00:00.000+00:00",
      attestation_fee: 75,
    },
  ];

  const generateDonationsPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text("Donation Report", 14, 22);

    // Add Date
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

    // Check if donation data exists
    if (donationData && donationData.length > 0) {
      // Add donation table with adjusted column widths
      doc.autoTable({
        startY: 40,
        head: [
          [
            { content: "ID", styles: { halign: "center" } },
            { content: "Created", styles: { halign: "center" } },
            { content: "Token Amount", styles: { halign: "center" } },
            { content: "XLM to LKR Rate", styles: { halign: "center" } },
            { content: "Token to XLM Rate", styles: { halign: "center" } },
            { content: "Donation Date", styles: { halign: "center" } },
            { content: "Attestation Fee", styles: { halign: "center" } },
          ],
        ],
        body: donationData.map((donation) => [
          { content: donation.donation_id, styles: { halign: "left" } },
          {
            content: new Date(donation.created).toLocaleDateString(),
            styles: { halign: "left" },
          },
          { content: donation.token_amount, styles: { halign: "right" } },
          { content: donation.xlmToLkrRate, styles: { halign: "right" } },
          { content: donation.tokenToXlmRate, styles: { halign: "right" } },
          {
            content: new Date(donation.donation_date).toLocaleDateString(),
            styles: { halign: "left" },
          },
          { content: donation.attestation_fee, styles: { halign: "right" } },
        ]),
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 5,
          halign: "center", // horizontal alignment
          valign: "middle", // vertical alignment
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Donation ID (reduced width)
          1: { cellWidth: 25 }, // Created
          2: { cellWidth: 25 }, // Token Amount
          3: { cellWidth: 30 }, // XLM to LKR Rate
          4: { cellWidth: 30 }, // Token to XLM Rate
          5: { cellWidth: 25 }, // Donation Date
          6: { cellWidth: 25 }, // Attestation Fee
        },
        margin: { top: 40 },
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

  // const generatePdfBeneficiary = () => {
  //   if (!Array.isArray(beneficiaryData) || beneficiaryData.length === 0) {
  //     alert("No beneficiaries found");
  //     return;
  //   }

  //   const doc = new jsPDF();
  //   doc.setFont("helvetica");

  //   // Set Title for the PDF
  //   doc.setFontSize(18);
  //   doc.text("Beneficiary Report", 14, 20);

  //   // Table Headers
  //   doc.setFontSize(12);
  //   const headers = [
  //     "Username",
  //     "District",
  //     "Phone No",
  //     "Verified",
  //     "Status",
  //     "Created At",
  //     "Raised Amount",
  //   ];
  //   let startY = 30;
  //   const margin = 10;
  //   const rowHeight = 10;

  //   // Draw the headers
  //   headers.forEach((header, index) => {
  //     doc.text(header, margin + index * 30, startY);
  //   });

  //   // Draw the data rows
  //   beneficiaryData.forEach((beneficiary, index) => {
  //     const y = startY + (index + 1) * rowHeight;
  //     doc.text(beneficiary.username, margin, y);
  //     doc.text(beneficiary.district, margin + 30, y);
  //     doc.text(beneficiary.phoneNo, margin + 60, y);
  //     doc.text(beneficiary.verified ? "Yes" : "No", margin + 90, y);
  //     doc.text(beneficiary.status, margin + 120, y);
  //     doc.text(
  //       new Date(beneficiary.created_at).toLocaleDateString(),
  //       margin + 150,
  //       y
  //     );
  //     doc.text(beneficiary.raised_amount.toString(), margin + 180, y);
  //   });

  //   // Save the PDF document
  //   doc.save("Beneficiary_Report.pdf");
  // };

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

    // Add a separator line under the title
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);

    // Define table headers
    const headers = [
      "Username",
      "District",
      "Phone No",
      "Verified",
      "Status",
      "Created At",
      "Raised Amount",
    ];

    // Map beneficiary data into table format
    const body = beneficiaryData.map((beneficiary) => [
      beneficiary.username,
      beneficiary.district,
      beneficiary.phoneNo,
      beneficiary.verified ? "Yes" : "No",
      beneficiary.status,
      new Date(beneficiary.created_at).toLocaleDateString(),
      beneficiary.raised_amount.toString(),
    ]);

    // Add the table with improved formatting using autoTable
    doc.autoTable({
      head: [headers], // Column headers
      body: body, // Row data
      startY: 30, // Start table below the title
      theme: "striped", // Adds a striped effect for easier readability
      styles: {
        fontSize: 10, // Font size for table content
        cellPadding: 4, // Padding in table cells
      },
      headStyles: {
        fillColor: [22, 160, 133], // Custom color for header background
        textColor: [255, 255, 255], // White text for headers
        fontStyle: "bold", // Bold headers
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Light gray alternate row
      },
      margin: { top: 30 }, // Adjust margin to position table properly
    });

    // Save the PDF document
    doc.save("Beneficiary_Report.pdf");
  };

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
                onClick={generatePdfBeneficiary}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Get Beneficiaries Report
              </button>
              <button
                // onClick={generateFinancialReport}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Financial Report
              </button>
              {/* <button
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
