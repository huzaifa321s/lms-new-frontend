import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InnerRoutesMiddlware = ({ element: Component, subscriptionRequired, ...rest }) => {

    const credentials = useSelector((state) => state.studentAuth.credentials);

    if (subscriptionRequired && credentials.subscription.status !== 'active') {
        return <Navigate to="/student/pay-invoice" />;
    }

    return <Component />;
};

export default InnerRoutesMiddlware;
