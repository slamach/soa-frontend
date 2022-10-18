import WithQuery from '../../components/WithQuery/WithQuery';
import {
  useDeleteRouteMutation,
  useGetRoutesQuery,
  useLazyGetObjectWithMinimumNameQuery,
  useLazyGetSumOfDistancesQuery,
  useLazyGetToGroupsQuery,
  useUpdateRouteMutation,
} from '../../state/api/routes';
import {
  DataGrid,
  GridRowsProp,
  GridColumns,
  GridSortModel,
  GridFilterModel,
  GridActionsCellItem,
  GridRenderEditCellParams,
  GridEditInputCell,
  GridFooterContainer,
  GridFooter,
} from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  ButtonGroup,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { isResponseError } from '../../utils/errorHandling';
import ContainerLoader from '../../components/ContainerLoader/ContainerLoader';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { validateDistance, validateName } from '../../utils/validation';
import AddRouteModal from '../../components/AddRouteDialog/AddRouteModal';

const ValidationEditInputCell = (props: GridRenderEditCellParams) => {
  const { error } = props;
  return (
    <Tooltip
      open={!!error}
      title={error}
      componentsProps={{
        tooltip: {
          sx: { color: 'error.contrastText', backgroundColor: 'error.main' },
        },
      }}
    >
      <GridEditInputCell {...props} />
    </Tooltip>
  );
};

interface CustomGridFooterProps {
  handleClick: () => void;
}

const CustomGridFooter = (props: CustomGridFooterProps) => {
  return (
    <GridFooterContainer>
      <Box sx={{ pl: 1 }}>
        <Button onClick={props.handleClick}>Add new route</Button>
      </Box>
      <GridFooter
        sx={{
          border: 'none',
        }}
      />
    </GridFooterContainer>
  );
};

const Routes = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(25);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [snackState, setSnackState] = useState<{
    open: boolean;
    severity: AlertColor | undefined;
    message: string | null;
  }>({
    open: false,
    severity: undefined,
    message: null,
  });
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

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
    creationDateFilter: filterModel.items.find(
      (item) => item.columnField === 'creationDate'
    )?.value,
    distanceFilter: filterModel.items.find(
      (item) => item.columnField === 'distance'
    )?.value,
  });
  const [updateRoute] = useUpdateRouteMutation();
  const [deleteRoute] = useDeleteRouteMutation();

  const [getObjectWithMinimumName] = useLazyGetObjectWithMinimumNameQuery();
  const [getToGroups] = useLazyGetToGroupsQuery();
  const [getSumOfDistances] = useLazyGetSumOfDistancesQuery();

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleError = (result: any, successMessage: string) => {
    if ('error' in result) {
      let errorMessage: string;
      if (isResponseError(result.error) && result.error.data.message) {
        errorMessage = result.error.data.message;
      } else {
        errorMessage = 'Unknown error';
      }
      setSnackState((prevState) => ({
        ...prevState,
        open: true,
        severity: 'error',
        message: errorMessage,
      }));
    } else {
      setSnackState((prevState) => ({
        ...prevState,
        open: true,
        severity: 'success',
        message: successMessage,
      }));
    }
  };

  const handleMinimumName = async () => {
    const result = await getObjectWithMinimumName();
    handleError(result, `Minimum name: ${result.data?.payload?.name}`);
  };

  const handleGroups = async () => {
    const result = await getToGroups();
    handleError(
      result,
      `Groups: ${Object.entries(result.data ?? {})
        .map((entry) => `${entry[0]}: ${entry[1]}`)
        .join(', ')}`
    );
  };

  const handleAllDistances = async () => {
    const result = await getSumOfDistances();
    handleError(result, `Sum of all distances: ${result.data?.payload}`);
  };

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 50,
      editable: true,
      preProcessEditCellProps: (params) => {
        return { ...params.props, error: validateName(params.props.value) };
      },
      renderEditCell: (params) => <ValidationEditInputCell {...params} />,
    },
    {
      field: 'x',
      headerName: 'X',
      type: 'number',
      flex: 25,
      editable: true,
      sortable: false,
    },
    {
      field: 'y',
      headerName: 'Y',
      type: 'number',
      flex: 25,
      editable: true,
      sortable: false,
    },
    {
      field: 'creationDate',
      headerName: 'Creation Date',
      flex: 80,
      type: 'dateTime',
      valueFormatter: (params) =>
        params.value.toLocaleString('en-US', {
          day: 'numeric',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit',
        }),
      valueGetter: (params) => new Date(params.value),
      valueSetter: (params) => ({
        ...params.row,
        creationDate: params.value.toISOString(),
      }),
      editable: true,
    },
    {
      field: 'from',
      headerName: 'From',
      flex: 25,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      valueFormatter: (params) => `${params.value.id}: ${params.value.name}`,
    },
    {
      field: 'to',
      headerName: 'To',
      flex: 25,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      valueFormatter: (params) => `${params.value.id}: ${params.value.name}`,
    },
    {
      field: 'distance',
      headerName: 'Distance',
      type: 'number',
      flex: 50,
      editable: true,
      preProcessEditCellProps: (params) => {
        return { ...params.props, error: validateDistance(params.props.value) };
      },
      renderEditCell: (params) => <ValidationEditInputCell {...params} />,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 75,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={async () => {
              const deleteResult = await deleteRoute(Number(id));
              handleError(deleteResult, 'Sucessfully deleted');
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows: GridRowsProp = useMemo(
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
        onErrorComponent={<p>ERROR</p>}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              padding: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">Additional endpoints:</Typography>
            <ButtonGroup>
              <Button onClick={handleMinimumName}>Minimum name</Button>
              <Button onClick={handleGroups}>Groups</Button>
              <Button onClick={handleAllDistances}>All distances</Button>
            </ButtonGroup>
          </Box>
          <DataGrid
            columns={columns}
            rows={rows}
            filterMode="server"
            paginationMode="server"
            sortingMode="server"
            loading={isLoading}
            processRowUpdate={async (newRow, oldRow) => {
              const updatedFields: { [key: string]: any } = {};
              console.log(JSON.stringify(newRow['creationDate']));
              console.log(JSON.stringify(oldRow['creationDate']));
              for (let field of Object.keys(newRow)) {
                if (
                  JSON.stringify(newRow[field]) !==
                  JSON.stringify(oldRow[field])
                ) {
                  updatedFields[field] = newRow[field];
                }
              }
              if (Object.keys(updatedFields).length === 0) {
                return oldRow;
              }
              const updateResult = await updateRoute({
                id: Number(newRow.id),
                ...updatedFields,
              });
              handleError(updateResult, 'Sucessfully updated');
            }}
            sortModel={sortModel}
            onSortModelChange={(model) => {
              setSortModel(model);
            }}
            page={page}
            onPageChange={(page) => {
              setPage(page);
            }}
            pageSize={size}
            onPageSizeChange={(size) => {
              setSize(size);
            }}
            rowsPerPageOptions={[5, 10, 25]}
            rowCount={data?.totalElements}
            disableSelectionOnClick
            disableColumnSelector
            disableDensitySelector
            filterModel={filterModel}
            onFilterModelChange={(model) => {
              setFilterModel(model);
            }}
            components={{
              Footer: CustomGridFooter,
            }}
            componentsProps={{
              filterPanel: {
                sx: {
                  '& .MuiDataGrid-filterFormOperatorInput': {
                    display: 'none',
                  },
                },
              },
              footer: {
                handleClick: () => setAddModalOpen(true),
              },
            }}
            experimentalFeatures={{
              newEditingApi: true,
            }}
          />
        </Box>
      </WithQuery>
      <Snackbar
        open={snackState.open}
        onClose={handleSnackClose}
        autoHideDuration={5000}
      >
        <Alert
          severity={snackState.severity}
          onClose={handleSnackClose}
          elevation={6}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
      <AddRouteModal
        open={addModalOpen}
        handleClose={() => setAddModalOpen(false)}
        handleAddResult={(result) => handleError(result, 'Sucessfullt added')}
      />
    </>
  );
};

export default Routes;
