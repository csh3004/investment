import React from 'react';
import TransationForm from '../../features/transaction/Transaction';
import MainLayout from '../../components/layout/MainLayout';

const Transaction: React.FC = () => {
  return (
    <MainLayout>
      <TransationForm />
    </MainLayout>
  );
};

export default Transaction;