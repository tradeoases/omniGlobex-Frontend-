// // src/components/MembershipPlansTable.js

// import React from 'react';

// const MembershipPlansTable = () => {
//   // Subscription plans data
//   const plans = [
//     {
//       name: 'Basic Membership',
//       price: 'Free for 1 month',
//       features: [
//         'Access to basic services, including limited product/service listings',
//         'Basic analytics and reporting tools',
//         'Limited messaging capability',
//         'No access to Consortium feature',
//         'No verification sign included',
//         'Basic customer support',
//         'Upgrade option available anytime during trial',
//       ],
//     },
//     {
//       name: 'Standard Membership',
//       price: '$1,000 per year',
//       features: [
//         'Full access to create, manage, and display product/service listings',
//         'Enhanced analytics and reporting tools',
//         'Unlimited messaging capability',
//         'Access to Consortium feature',
//         'Verification badge after vetting',
//         'Basic private business services',
//         'Standard customer support',
//         'Country-specific analytics',
//       ],
//     },
//     {
//       name: 'Premium Membership',
//       price: '$2,500 per year',
//       features: [
//         'All Standard Membership features',
//         'Advanced analytics and reporting tools',
//         'Enhanced private business services',
//         'Priority customer support',
//         'Exclusive access to market insights and trend reports',
//         'More frequent verification updates',
//         'Extended Consortium features',
//         'Advertising and promotion tools',
//         'Dedicated account manager',
//       ],
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">OmniGlobex Membership Plans</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Features</th>
//               {plans.map((plan) => (
//                 <th key={plan.name} className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                   {plan.name} <br/>({plan.price})
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {[
//               'Access to basic services',
//               'Analytics and reporting tools',
//               'Messaging capability',
//               'Consortium feature',
//               'Verification sign',
//               'Customer support',
//               'Upgrade options',
//               'Advanced business services',
//               'Priority customer support',
//               'Advertising tools',
//               'Dedicated account manager',
//             ].map((feature, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feature}</td>
//                 {plans.map((plan, i) => (
//                   <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
//                     {plan.features.includes(feature) ? '✔️' : '❌'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MembershipPlansTable;
// src/components/MembershipPlansTable.js

import React from 'react';

const MembershipPlansTable = () => {
  // Subscription plans data
  const plans = [
    {
      name: 'Basic Membership',
      price: 'Free for 1 month',
      features: {
        basicServices: true,
        analytics: 'Basic',
        messaging: 'Limited',
        consortium: false,
        verification: false,
        support: 'Basic',
        upgrade: true,
        advancedServices: false,
        prioritySupport: false,
        advertising: false,
        accountManager: false,
      },
    },
    {
      name: 'Standard Membership',
      price: '$1,000 per year',
      features: {
        basicServices: true,
        analytics: 'Enhanced',
        messaging: 'Unlimited',
        consortium: true,
        verification: true,
        support: 'Standard',
        upgrade: true,
        advancedServices: true,
        prioritySupport: false,
        advertising: false,
        accountManager: false,
      },
    },
    {
      name: 'Premium Membership',
      price: '$2,500 per year',
      features: {
        basicServices: true,
        analytics: 'Advanced',
        messaging: 'Unlimited',
        consortium: true,
        verification: true,
        support: 'Priority',
        upgrade: true,
        advancedServices: true,
        prioritySupport: true,
        advertising: true,
        accountManager: true,
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">OmniGlobex Membership Plans</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Features</th>
              {plans.map((plan) => (
                <th key={plan.name} className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  {plan.name} <br />({plan.price})
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Access to basic services</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.basicServices ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Analytics and reporting tools</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.analytics}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Messaging capability</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.messaging}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Access to Consortium feature</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.consortium ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Verification sign included</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.verification ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customer support level</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.support}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Upgrade options available</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.upgrade ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Advanced business services</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.advancedServices ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Priority customer support</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.prioritySupport ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Advertising tools</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.advertising ? '✔️' : '❌'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dedicated account manager</td>
              {plans.map((plan) => (
                <td key={plan.name} className="px-6 py-4 text-center">{plan.features.accountManager ? '✔️' : '❌'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipPlansTable;
