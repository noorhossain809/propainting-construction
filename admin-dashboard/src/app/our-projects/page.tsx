

import React from 'react';
import ProjectPage from '../pages/project';
import DashboardLayout from '../dashboard/layout';

const page = () => {
    return (
        <DashboardLayout>
            <ProjectPage />
        </DashboardLayout>
    );
};

export default page;