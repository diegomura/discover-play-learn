import React from 'react';

function Text({ as = 'p', children, className, ...rest }) {
  return React.createElement(
    as,
    {
      className: className,
      ...rest,
    },
    children
  );
}
export default Text;
