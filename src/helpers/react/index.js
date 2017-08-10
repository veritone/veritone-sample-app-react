import React, { PropTypes as ReactPropTypes } from 'react';
//import { PropTypes } from 'prop-types';

export const PropTypes = {
  ...ReactPropTypes,
  children: ReactPropTypes.node
};

// export function injectInto(children, props) {
//   return React.Children.map(children, child => {
//     return React.cloneElement(child, props);
//   });
// }
//
// // <Thing
// //   { ...maybeProp(
// //     'icon',
// //     <WarningIcon color="red" />,
// //     stepsWithSubmitErrors.includes(step.path))
// //   }
// // >
// export function maybeProp(prop, value, condition) {
//   return omitBy(
//     {
//       [prop]: condition ? value : undefined
//     },
//     isUndefined
//   );
// }
