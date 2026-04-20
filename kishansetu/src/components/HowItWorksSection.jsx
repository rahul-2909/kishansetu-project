// import React from 'react';
// import '../styles/HowItWorksSection.css';


// const steps = [
//   {
//     number: '01',
//     emoji: '👨‍🌾',
//     title: 'List Products',
//     description: 'Farmers upload fresh produce with photos and prices',
//   },
//   {
//     number: '02',
//     emoji: '🛒',
//     title: 'Place Order',
//     description: 'Buy directly from farmers — no middlemen involved',
//   },
//   {
//     number: '03',
//     emoji: '🚚',
//     title: 'Fast Delivery',
//     description: 'Get fresh items delivered to your doorstep same day',
//   },
// ];

// const HowItWorksSection = () => {
//   return (
//     <section id="how-it-works" className="how-it-works">
//       <div className="how-inner">

//         {/* Header */}
//         <div className="how-header">
//           <span className="how-badge">Simple Process</span>
//           <h2 className="how-title">How It Works</h2>
//           <p className="how-subtitle">
//             Three easy steps from farm to your table
//           </p>
//         </div>

//         {/* Steps */}
//         <div className="how-steps">

//           {steps.map((step, index) => (
//             <div className="how-step-wrapper" key={step.number}>
//               <div className="how-step">
//                 <div className="how-step-number">{step.number}</div>
//                 <div className="how-step-icon">{step.emoji}</div>
//                 <h3 className="how-step-title">{step.title}</h3>
//                 <p className="how-step-desc">{step.description}</p>
//               </div>

//               {/* Connector Arrow (not after last) */}
//               {index < steps.length - 1 && (
//                 <div className="how-connector">
//                   <svg
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M5 12h14" />
//                     <path d="M12 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorksSection;

import React from 'react';
import '../styles/HowItWorksSection.css';

const steps = [
  {
    number: '01',
    emoji: '👨‍🌾',
    title: 'Choose Farmer',
    description: 'Browse local farmers near you and pick the one you trust',
  },
  {
    number: '02',
    emoji: '📞',
    title: 'Call Directly',
    description: 'Speak with the farmer directly — ask about produce, prices & availability',
  },
  {
    number: '03',
    emoji: '🤝',
    title: 'Connect & Buy',
    description: 'Meet the farmer, visit the farm, or arrange a convenient pickup point',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-inner">

        {/* Header */}
        <div className="how-header">
          <span className="how-badge">Simple Process</span>
          <h2 className="how-title">How It Works</h2>
          <p className="how-subtitle">
            Connect with farmers directly in three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="how-steps">

          {steps.map((step, index) => (
            <div className="how-step-wrapper" key={step.number}>
              <div className="how-step">
                <div className="how-step-number">{step.number}</div>
                <div className="how-step-icon">{step.emoji}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.description}</p>
              </div>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="how-connector">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
