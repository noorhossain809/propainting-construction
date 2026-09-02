import React from 'react';
import ServicePage from '../pages/service';
import DashboardLayout from '../dashboard/layout';

const page = () => {
    return (
        <DashboardLayout>
        <ServicePage/>
        </DashboardLayout>
    );
};

export default page;