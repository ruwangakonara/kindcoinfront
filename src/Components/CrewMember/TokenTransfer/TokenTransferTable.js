import React, { useState } from 'react';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Icon,
  Menu,
  Table,
  Button,
  Modal,
  Input,
  Form,
} from 'semantic-ui-react';
import './TokenTransferTable.css';

const data = [
  {
    requestId: '0001',
    donorName: 'Liviru Weerasinghe',
    donorId: 'D001',
    walletId: '230543',
    doneeName: 'Charity Org',
    doneeId: 'C001',
  },
  {
    requestId: '0002',
    donorName: 'Saman Arachchige',
    donorId: 'D002',
    walletId: '23075',
    doneeName: 'Helping Hands',
    doneeId: 'C002',
  },
];

const TokenTransferTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [transferAmount, setTransferAmount] = useState('');
  const [walletId, setWalletId] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handlePayClick = () => {
    if (!walletId || !transferAmount) {
      alert('Please fill out all fields.');
      return;
    }

    setConfirmOpen(true);
  };

  const confirmPayment = () => {
    console.log('Payment confirmed:', {
      donorName: selectedRecord.donorName,
      walletId,
      transferAmount,
    });

    setConfirmOpen(false);
    setModalOpen(false);
  };

  return (
    <div className='token-transfer-container'>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Request ID</TableHeaderCell>
            <TableHeaderCell>Donor Name</TableHeaderCell>
            <TableHeaderCell>Donor ID</TableHeaderCell>
            <TableHeaderCell>Wallet ID</TableHeaderCell>
            <TableHeaderCell>Donee Name</TableHeaderCell>
            <TableHeaderCell>Donee ID</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} onClick={() => handleRowClick(row)}>
              <TableCell>{row.requestId}</TableCell>
              <TableCell>{row.donorName}</TableCell>
              <TableCell>{row.donorId}</TableCell>
              <TableCell>{row.walletId}</TableCell>
              <TableCell>{row.doneeName}</TableCell>
              <TableCell>{row.doneeId}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableHeaderCell colSpan='6'>
              <Menu floated='right' pagination>
                <MenuItem as='a' icon>
                  <Icon name='chevron left' />
                </MenuItem>
                <MenuItem as='a'>1</MenuItem>
                <MenuItem as='a'>2</MenuItem>
                <MenuItem as='a'>3</MenuItem>
                <MenuItem as='a'>4</MenuItem>
                <MenuItem as='a' icon>
                  <Icon name='chevron right' />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size='small'
        closeIcon
      >
        <Modal.Header>Transfer Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Donor Name</label>
              <Input value={selectedRecord.donorName} readOnly />
            </Form.Field>
            <Form.Field>
              <label>Wallet ID</label>
              <Input
                value={selectedRecord.walletId}
                // onChange={(e) => setWalletId(e.target.value)}
                // placeholder='Enter Wallet ID'
              />
            </Form.Field>
            <Form.Field>
              <label>Transfer Amount</label>
              <Input
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder='Enter Transfer Amount'
              />
            </Form.Field>
            <Button primary onClick={handlePayClick}>
              Pay
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      {/* Confirmation modal */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        size='mini'
        closeIcon
      >
        <Modal.Header>Confirm Payment</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to transfer {transferAmount} to{' '}
            {selectedRecord.doneeName}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={confirmPayment}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TokenTransferTable;
