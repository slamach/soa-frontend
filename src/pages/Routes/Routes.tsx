import CircularProgress from '@mui/material/CircularProgress';
import WithQuery from '../../components/WithQuery/WithQuery';
import { useGetRoutesQuery } from '../../state/api/routes';

const Routes = () => {
  const { data, error, isLoading } = useGetRoutesQuery({});

  return (
    <WithQuery
      isLoading={isLoading}
      error={error}
      onLoadingComponent={<CircularProgress />}
      onErrorComponent={<p>ERROR</p>}
    >
      <p>{JSON.stringify(data)}</p>
    </WithQuery>
  );
};

export default Routes;
