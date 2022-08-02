import React, { ReactNode } from "react";

class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Проблемы с подключением удалённого модуля</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
