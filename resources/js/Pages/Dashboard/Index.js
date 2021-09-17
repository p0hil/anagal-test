import React from 'react';
import Layout from '@/Common/Layout';
import {usePage} from "@inertiajs/inertia-react";

const Dashboard = () => {
  const { auth } = usePage().props;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      User: { auth.user && auth.user.first_name }
    </div>
  );
};

Dashboard.layout = page => <Layout title="Dashboard" children={page} />;
export default Dashboard;
