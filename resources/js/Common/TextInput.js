import React from 'react';

export default ({label, name, className, errors = [], ...props}) => {
  return (
    <div>
      <input
        id={name}
        name={name}
        {...props}
        className={`form-input ${errors.length ? 'error' : ''}`}
      />
      {errors && <div className="form-error">{errors}</div>}
    </div>
  );
};
