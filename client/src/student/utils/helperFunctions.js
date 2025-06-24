export const getSubscriptionStatus = (status) => {

    if(!status) return 'Inactive';
    
    if(status === 'active') return 'Active';
    if(status === 'past_due') return 'Expired';
    if(status === 'canceled') return 'Canceled';
    if(status === 'trialing') return 'On Trial';
    if(status === 'incomplete') return 'Incomplete';
    if(status === 'unpaid') return 'Inactive';
}


