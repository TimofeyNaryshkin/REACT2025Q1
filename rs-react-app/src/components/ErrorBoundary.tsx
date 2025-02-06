import React, { Component } from 'react';
import Button from './UI/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>
            Oops Error Please try{' '}
            <Button onButtonClick={() => window.location.reload()}>
              reload
            </Button>{' '}
            this page
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}
