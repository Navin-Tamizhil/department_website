import React, { Suspense } from 'react';

/**
 * A wrapper for React.lazy and Suspense to easily lazy-load components.
 * @param {object} props - The component props.
 * @param {React.ComponentType} props.component - The component to lazy load.
 * @returns {React.ReactNode} The lazy-loaded component with a Suspense fallback.
 */
const LazyRoute = ({ component: Component, ...rest }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...rest} />
    </Suspense>
  );
};

export default LazyRoute;