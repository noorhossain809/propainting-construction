import DashboardLayout from '@/app/dashboard/layout';
import { ProjectForm } from '@/app/pages/add-project';
import React from 'react';

const page = () => {
    return (
        <DashboardLayout >
            <ProjectForm />
        </DashboardLayout>
    );
};

export default page;