import React from 'react';
import { Navigate } from 'react-router-dom';

// Budget feature has been removed from the platform.
// This redirect stub ensures open editor tabs have zero TypeScript errors.
export const BudgetPage: React.FC = () => <Navigate to="/destinations" replace />;

export default BudgetPage;
