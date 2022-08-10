import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 10 }}>
      <h4>{children}</h4>
    </Alert>
  );
};

export default ErrorMessage;
