import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import Button from '../atom/Button';
import Paragraph from '../atom/Paragraph';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  console.log(error);
  return (
    <div className=" flex items-center justify-center">
      <Paragraph>{error.message}</Paragraph>
      <Button onClick={() => resetErrorBoundary()}>reset</Button>
    </div>
  );
};

export default ErrorFallback;