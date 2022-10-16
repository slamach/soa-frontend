interface WithQueryProps {
  isLoading: boolean;
  error?: unknown;
  onErrorComponent: JSX.Element;
  onLoadingComponent: JSX.Element;
  children: JSX.Element;
}

const WithQuery = (props: WithQueryProps) => {
  if (props.error) {
    return props.onErrorComponent;
  }
  return props.isLoading ? props.onLoadingComponent : props.children;
};

export default WithQuery;
