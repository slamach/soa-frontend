import WithQuery from '../../components/WithQuery/WithQuery';
import {
  useAddRouteMutation,
  useDeleteRouteMutation,
  useGetRoutesQuery,
  useLazyGetObjectWithMinimumNameQuery,
  useLazyGetSumOfDistancesQuery,
  useLazyGetToGroupsQuery,
  useUpdateRouteMutation,
} from '../../state/api/routes';
import { GridSortModel, GridFilterModel } from '@mui/x-data-grid';
import { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ContainerLoader from '../../components/ContainerLoader/ContainerLoader';
import AddRouteDialog from '../../components/AddRouteDialog/AddRouteDialog';
import ContainerError from '../../components/ContainerError/ContainerError';
import RouteGrid, {
  RouteGridRowType,
} from '../../components/RouteGrid/RouteGrid';
import { RouteAddDTO, RouteUpdateDTO } from '../../types/api';
import { useProcessResult } from '../../hooks/useProcessResult';

const Routes = () => {
  // Page state
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const { processResult } = useProcessResult();

  // Grid state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(25);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  // Core endpoints
  const { data, error, isLoading } = useGetRoutesQuery({
    page,
    size,
    sort: sortModel.map((rule) => Object.values(rule).join(',')),
    nameFilter: filterModel.items.find((item) => item.columnField === 'name')
      ?.value,
    coordinatesXFilter: filterModel.items.find(
      (item) => item.columnField === 'x'
    )?.value,
    coordinatesYFilter: filterModel.items.find(
      (item) => item.columnField === 'y'
    )?.value,
    distanceFilter: filterModel.items.find(
      (item) => item.columnField === 'distance'
    )?.value,
  });
  const [addRoute] = useAddRouteMutation();
  const [updateRoute] = useUpdateRouteMutation();
  const [deleteRoute] = useDeleteRouteMutation();

  const handleAddRoute = useCallback(
    async (dto: RouteAddDTO) => {
      const updateResult = await addRoute(dto);
      return processResult(updateResult, 'Sucessfully added');
    },
    [addRoute, processResult]
  );

  const handleUpdateRoute = useCallback(
    async (id: number, updatedFields: Omit<RouteUpdateDTO, 'id'>) => {
      const updateResult = await updateRoute({
        id: Number(id),
        ...updatedFields,
      });
      return processResult(updateResult, 'Sucessfully updated');
    },
    [updateRoute, processResult]
  );

  const handleDeleteRoute = useCallback(
    async (id: number) => {
      const deleteResult = await deleteRoute(id);
      return processResult(deleteResult, 'Sucessfully deleted');
    },
    [deleteRoute, processResult]
  );

  // Additional endpoints
  const [getObjectWithMinimumName] = useLazyGetObjectWithMinimumNameQuery();
  const [getToGroups] = useLazyGetToGroupsQuery();
  const [getSumOfDistances] = useLazyGetSumOfDistancesQuery();

  const handleMinimumName = useCallback(async () => {
    const result = await getObjectWithMinimumName();
    return processResult(result, `Minimum name: ${result.data?.payload?.name}`);
  }, [getObjectWithMinimumName, processResult]);

  const handleGroups = useCallback(async () => {
    const result = await getToGroups();
    return processResult(
      result,
      `Groups: ${Object.entries(result.data ?? {})
        .map((entry) => `${entry[0]}: ${entry[1]}`)
        .join(', ')}`
    );
  }, [getToGroups, processResult]);

  const handleAllDistances = useCallback(async () => {
    const result = await getSumOfDistances();
    return processResult(
      result,
      `Sum of all distances: ${result.data?.payload}`
    );
  }, [getSumOfDistances, processResult]);

  const rows: RouteGridRowType[] = useMemo(
    () =>
      data
        ? data.content.map((route) => ({
            id: route.id,
            name: route.name,
            x: route.coordinates.x,
            y: route.coordinates.y,
            creationDate: route.creationDate,
            from: route.from,
            to: route.to,
            distance: route.distance,
          }))
        : [],
    [data]
  );

  return (
    <>
      <WithQuery
        isLoading={isLoading}
        error={error}
        onLoadingComponent={<ContainerLoader />}
        onErrorComponent={
          <ContainerError errorMessage="Error while fetching initial data" />
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <Container maxWidth="xl" sx={{ pt: 1, pb: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" component="h2">
                Additional endpoints:
              </Typography>
              <ButtonGroup>
                <Button onClick={handleMinimumName}>Minimum name</Button>
                <Button onClick={handleGroups}>Groups</Button>
                <Button onClick={handleAllDistances}>All distances</Button>
              </ButtonGroup>
            </Stack>
            <Divider sx={{ mt: 1 }} />
          </Container>
          <RouteGrid
            rows={rows}
            isLoading={isLoading}
            sortModel={sortModel}
            filterModel={filterModel}
            page={page}
            size={size}
            totalElements={data?.totalElements}
            setFilterModel={setFilterModel}
            setSortModel={setSortModel}
            setPage={setPage}
            setSize={setSize}
            setAddDialogOpen={setAddDialogOpen}
            handleUpdateRoute={handleUpdateRoute}
            handleDeleteRoute={handleDeleteRoute}
          />
        </Box>
      </WithQuery>
      <AddRouteDialog
        open={addDialogOpen}
        handleClose={() => setAddDialogOpen(false)}
        handleAddResult={handleAddRoute}
      />
    </>
  );
};

export default Routes;
