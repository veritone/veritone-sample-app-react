import React from 'react';
import { toPairs, noop, isUndefined, isNull, reduce } from 'lodash';
import LibTextField from 'material-ui/TextField';
import LibSelectField from 'material-ui/SelectField';
import { darkBlack } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import { PropTypes } from 'helpers/react';

const { children, inputShape, metaShape, string, bool, number } = PropTypes;
export const TextField = ({
  input,
  className,
  label,
  type,
  multiLine,
  rows,
  rowsMax,
  maxLength,
  meta: { touched, error, warning }
}) => {
  const maxLengthLabel = `${label} (${input.value.length}/${maxLength})`;
  return (
    <div>
      <LibTextField
        type={type}
        floatingLabelText={
          maxLength && input.value.length ? maxLengthLabel : label
        }
        errorText={touched && (error || warning)}
        multiLine={multiLine}
        rows={rows}
        rowsMax={rowsMax}
        className={className}
        {...input}
      />
    </div>
  );
};

TextField.propTypes = {
  input: inputShape,
  meta: metaShape,
  label: string,
  type: string,
  className: string,
  multiLine: bool,
  autofocus: bool,
  rows: number,
  rowsMax: number,
  maxLength: number
};

// blockFocusBlur hack:
// see https://github.com/callemall/material-ui/issues/5260
export const SelectField = ({
  input,
  label,
  children,
  blockFocusBlur,
  loading,
  loadingError,
  meta: { touched, error },
  ...custom
}) => {
  const handleChange = (event, index, value) => input.onChange(value);

  const loadingLabelStyle = {
    right: '50%'
    // top: 25
  };

  return (
    <LibSelectField
      disabled={loading || loadingError}
      floatingLabelText={loading && <CircularProgress size={28} />}
      floatingLabelStyle={(loading && loadingLabelStyle) || {}}
      errorText={
        (loadingError && 'Failed to load menu items') || (touched && error)
      }
      {...input}
      onChange={handleChange}
      onFocus={blockFocusBlur ? noop : input.onFocus}
      onBlur={blockFocusBlur ? noop : input.onBlur}
      children={children}
      selectedMenuItemStyle={{
        backgroundColor: '#eee',
        color: darkBlack
      }}
      {...custom}
    />
  );
};

SelectField.propTypes = {
  input: inputShape,
  meta: metaShape,
  label: string,
  children,
  blockFocusBlur: bool,
  loading: bool,
  loadingError: bool
};

// export const DropDownMenu = ({
//   input, className, children, blockFocusBlur
//   // meta: { touched, error, warning }
// }) => {
//   function handleChange(event, key, payload) {
//     return input.onChange(String(payload));
//   }
//
//   return (
//     <LibDropDownMenu className={ className }
//                      { ...input }
//                      onChange={ handleChange }
//                      onFocus={ blockFocusBlur ? noop : input.onFocus }
//                      onBlur={ blockFocusBlur ? noop : input.onBlur }
//                      underlineStyle={{ marginLeft: 0 }}
//     >
//       { children }
//     </LibDropDownMenu>
//   );
// };
//
// DropDownMenu.propTypes = {
//   children: children,
//   input: inputShape,
//   className: string,
//   blockFocusBlur: bool
// };

export const syncValidation = rules => formValues => {
  return toPairs(rules).reduce((result, [name, rule]) => {
    const ruleResult = rule(formValues);

    if (ruleResult) {
      result[name] = ruleResult;
    }

    return result;
  }, {});
};

export const requireFields = (
  fields = [],
  { message = 'Required' } = {}
) => formValues => {
  return fields.reduce((result, field) => {
    if (
      isUndefined(formValues[field]) ||
      isNull(formValues[field]) ||
      formValues[field] === ''
    ) {
      result[field] = message;
    }

    return result;
  }, {});
};

export const composeValidations = validations => vals =>
  reduce(validations, (r, fn) => ({ ...r, ...fn(vals) }), {});
