import React from "react";
import PropTypes from "prop-types";

/* Child should be <input> tag only for 
this component or React component which renders <input> tag*/

const WithInputVaildator = ({children, message, pattern, type, ...rest}) => {
  if (children.length === 0 || children.length > 1) {
    throw new Error("<WithEmailVaildator /> should have one child only!");
  }

  const childProps = {};
  const additionProps = {
    pattern,
    type,
    onInvalid: e => {
      e.target.setCustomValidity && e.target.setCustomValidity(message);
      childProps.onInvalid && childProps.onInvalid(e);
    },
    onChange: e => { 
      // Input box shows incorrect validation message while input, 
      // So once pattern matches, it removes the custom message
      const reg = new RegExp(pattern);
      const msg = reg.test(e.target.value) ?  "" : message;
      e.target.setCustomValidity && e.target.setCustomValidity(msg);
      childProps.onChange && childProps.onChange(e);
    },
    ...rest
  };

  const childrenWithProps = React.Children.map(children, child => {
    childProps.onChange = child.props.onChange;
    childProps.onInvalid = child.props.onInvalid;
    return React.cloneElement(child, { ...additionProps });
  });

  return (
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  );
};

WithInputVaildator.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  pattern: PropTypes.string
};

WithInputVaildator.defaultProps = {
  message: "Invalid email",
  type: "email",
  pattern: "^([\\w.%+-]+)@([\\w-]+\\.)+([\\w]{2,})$"
};

export default WithInputVaildator;

