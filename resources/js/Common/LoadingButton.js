import React from 'react';
import cx from 'classnames';

export default ({ loading, className, children, ...props }) => {
  const classNames = cx(
    'flex items-center',
    'focus:outline-none',
    {
      'pointer-events-none bg-opacity-75 select-none': loading
    },
    className
  );
  return (
    <button disabled={loading} className={classNames} {...props}>
      {loading && <i className="fa fa-spinner mr-5"></i>}
      {children}
    </button>
  );
};
