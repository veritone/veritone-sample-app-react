import React, { PropTypes as ReactPropTypes } from 'react';
import { omitBy, isUndefined } from 'lodash';

import { fetchingStatus } from 'helpers/redux';
import { Interval } from 'helpers/date';

export const PropTypes = {
  ...ReactPropTypes,

  children: ReactPropTypes.node,

  // redux-form
  inputShape: ReactPropTypes.shape({
    name: ReactPropTypes.string,
    onBlur: ReactPropTypes.func,
    onChange: ReactPropTypes.func,
    onDragStart: ReactPropTypes.func,
    onDrop: ReactPropTypes.func,
    onFocus: ReactPropTypes.func,
    value: ReactPropTypes.any
  }),
  metaShape: ReactPropTypes.shape({
    touched: ReactPropTypes.bool,
    error: ReactPropTypes.string,
    warning: ReactPropTypes.string
  }),

  // react-router
  routerShape: ReactPropTypes.shape({
    push: ReactPropTypes.func,
    isActive: ReactPropTypes.func
    // etc
  }),

  fetchingStatusEnum: ReactPropTypes.oneOf(Object.values(fetchingStatus)),

  interval: ReactPropTypes.instanceOf(Interval),

  wizardConfigShape: ReactPropTypes.shape({
    model: ReactPropTypes.shape({
      fields: ReactPropTypes.objectOf(ReactPropTypes.string).isRequired,
      requiredFields: ReactPropTypes.arrayOf(ReactPropTypes.string).isRequired,
      initialValues: ReactPropTypes.objectOf(ReactPropTypes.any).isRequired,
      validate: ReactPropTypes.func.isRequired
    }).isRequired,
    steps: ReactPropTypes.arrayOf(
      ReactPropTypes.shape({
        path: ReactPropTypes.string.isRequired,
        label: ReactPropTypes.string.isRequired,
        fields: ReactPropTypes.array.isRequired
      })
    ).isRequired
  })
};

export function injectInto(children, props) {
  return React.Children.map(children, child => {
    return React.cloneElement(child, props);
  });
}

// <Thing
//   { ...maybeProp(
//     'icon',
//     <WarningIcon color="red" />,
//     stepsWithSubmitErrors.includes(step.path))
//   }
// >
export function maybeProp(prop, value, condition) {
  return omitBy(
    {
      [prop]: condition ? value : undefined
    },
    isUndefined
  );
}
