import React, { useState } from "react";
import classes from "./CrewMemberToDonationTable.module.css";
import { useNavigate } from "react-router-dom";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  Button,
  Icon,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Dropdown,
} from "semantic-ui-react";
import axios from "axios";

const CrewMemberToDonationsTable = ({
  donations,
  members,
  axiosInstance,
  getdonations,
}) => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleAssignClick = (donation) => {
    setSelectedDonation(donation);
    setOpenModal(true);
  };

  const handleAssignRequest = async () => {
    if (!selectedMemberId) {
      setError("Please select a member.");
      return;
    }

    try {
      const response = await axiosInstance.post("/admin/assign_member", {
        donation_id: selectedDonation._id,
        member_id: selectedMemberId,
      });

      if (response.status === 200) {
        getdonations();

        setOpenModal(false);
        setSuccessModalOpen(true);
        setError(null);
      }
    } catch (error) {
      console.error("Error assigning member:", error);
      setError("Failed to assign member. Please try again.");
    }
  };

  const getMemberDetails = (memberId) => {
    return members.find((member) => member._id === memberId);
  };

  return (
    <div className={classes.admin_mainContainer}>
      {/* <Input
            icon="search"
            iconPosition="left"
            placeholder="Search Donations..."
            focus
        /> */}
      <Table celled compact definition>
        <TableHeader fullWidth>
          <TableRow>
            <TableHeaderCell>Donation ID</TableHeaderCell>
            <TableHeaderCell>Donation Title</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Donor Name</TableHeaderCell>
            <TableHeaderCell>Beneficiary Name</TableHeaderCell>
            <TableHeaderCell>Request Title</TableHeaderCell>
            <TableHeaderCell>Member ID</TableHeaderCell>
            <TableHeaderCell>Member Name</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation, index) => {
            const memberDetails = donation.donationDetails?.member_id
              ? getMemberDetails(donation.donationDetails.member_id)
              : null;

            return (
              <TableRow key={index}>
                <TableCell>{donation.donationDetails?._id}</TableCell>
                <TableCell>{donation.donationDetails?.title}</TableCell>
                <TableCell>{donation.donationDetails?.type || "N/A"}</TableCell>
                <TableCell>
                  {donation.donorDetails?.name || "Unknown Donor"}
                </TableCell>
                <TableCell>
                  {donation.beneficiaryDetails?.name || "Unknown Beneficiary"}
                </TableCell>
                <TableCell>{donation.requestDetails?.title}</TableCell>
                <TableCell>{memberDetails?._id || "N/A"}</TableCell>
                <TableCell>{memberDetails?.name || "N/A"}</TableCell>
                <TableCell className={classes.admin_buttonStyles}>
                  <Button
                    color="blue"
                    onClick={() => handleAssignClick(donation.donationDetails)}
                  >
                    Assign Member
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Assign Member Modal */}
      <Modal
        dimmer="blurring"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>
          Assign Member for Donation: {selectedDonation?.title} (
          {selectedDonation?._id})
        </ModalHeader>
        <ModalContent>
          <Dropdown
            placeholder="Select Member"
            fluid
            selection
            options={members.map((member) => ({
              key: member._id,
              text: `${member.name} (ID: ${member._id}, Username: ${member.username})`,
              value: member._id,
            }))}
            onChange={(e, { value }) => setSelectedMemberId(value)}
          />
          {error && <div className="error-message">{error}</div>}
        </ModalContent>
        <ModalActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button color="blue" onClick={handleAssignRequest}>
            Assign Member
          </Button>
        </ModalActions>
      </Modal>

      {/* Success Modal */}
      <Modal
        dimmer="blurring"
        open={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          // navigate("/admin/assign/crew_member");
        }}
      >
        <ModalHeader>Success</ModalHeader>
        <ModalContent>
          <p>Member successfully assigned to the donation.</p>
        </ModalContent>
        <ModalActions>
          <Button
            onClick={() => {
              setSuccessModalOpen(false);
              // navigate("/admin/assign/crew_member");
            }}
          >
            Close
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
};

export default CrewMemberToDonationsTable;
