import jsPDF from "jspdf";

const GenerativeFunctions = () => {
  function generateUserPDF(users) {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("User Report", 105, 15, { align: "center" });

    // Add table headers
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0); // black color
    doc.text("User Id", 10, 30);
    doc.text("UserName", 50, 30);
    doc.text("Password", 90, 30);
    doc.text("Status", 130, 30);
    doc.text("Active", 170, 30);

    // Draw a horizontal line under headers
    doc.line(10, 32, 200, 32); // from (x1, y1) to (x2, y2)

    // Add user data to the PDF
    let y = 40; // Initial Y-axis position for user data
    doc.setFont("helvetica", "normal"); // Regular font for user data
    users.forEach((user, index) => {
      doc.text(String(user._id), 10, y);
      doc.text(user.username, 50, y);
      doc.text(user.password, 90, y);
      doc.text(user.status, 130, y);
      doc.text(user.isEthical ? "Yes" : "No", 170, y); // Active status as Yes/No

      // Draw a horizontal line after each row (optional for styling)
      doc.line(10, y + 2, 200, y + 2);

      y += 10; // Move to the next line
    });

    // Add page footer (Optional)
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 290); // Footer with date
    doc.text("Page 1", 200, 290, { align: "right" });

    // Save the PDF
    doc.save("user_report.pdf");
  }
};

// export default generateUserPDF = (users) => {
//   const doc = new jsPDF();

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
