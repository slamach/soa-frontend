import {
  DataGrid,
  GridActionsCellItem,
  GridCellParams,
  GridColumns,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { validateDistance, validateName } from '../../utils/validation';
import ValidationRouteGridEditInputCell from '../ValidationRouteGridEditInputCell/ValidationRouteGridEditInputCell';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RouteGridFooter from '../RouteGridFooter/RouteGridFooter';
import { Location, RouteUpdateDTO } from '../../types/api';
import { useCallback, useMemo } from 'react';

export interface RouteGridRowType {
  id: number;
  name: string;
  x: number;
  y: number;
  creationDate: string;
  from: Location;
  to: Location;
  distance: number;
}

interface RouteGridProps {
  rows: RouteGridRowType[];
  isLoading: boolean;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  page: number;
  size: number;
  totalElements: number | undefined;
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>;
  setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateRoute: (
    id: number,
    updatedRoutes: Omit<RouteUpdateDTO, 'id'>
  ) => Promise<boolean>;
  handleDeleteRoute: (id: number) => Promise<boolean>;
}

const RouteGrid = (props: RouteGridProps) => {
  const { handleUpdateRoute, handleDeleteRoute } = props;

  const columns: GridColumns<RouteGridRowType> = useMemo(
    () => [
      {
        field: 'name',
        type: 'string',
        headerName: 'Name',
        flex: 50,
        editable: true,
        preProcessEditCellProps: (params) => {
          return { ...params.props, error: validateName(params.props.value) };
        },
        renderEditCell: (params) => (
          <ValidationRouteGridEditInputCell {...params} />
        ),
      },
      {
        field: 'x',
        type: 'number',
        headerName: 'X',
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
        type: 'dateTime',
        headerName: 'Creation Date',
        flex: 80,
        editable: true,
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
      },
      {
        field: 'from',
        type: 'string',
        headerName: 'From',
        flex: 25,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        valueFormatter: (params) => `${params.value.id}: ${params.value.name}`,
      },
      {
        field: 'to',
        type: 'string',
        headerName: 'To',
        flex: 25,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        valueFormatter: (params) => `${params.value.id}: ${params.value.name}`,
      },
      {
        field: 'distance',
        type: 'number',
        headerName: 'Distance',
        flex: 50,
        editable: true,
        preProcessEditCellProps: (params) => {
          return {
            ...params.props,
            error: validateDistance(params.props.value),
          };
        },
        renderEditCell: (params) => (
          <ValidationRouteGridEditInputCell {...params} />
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 75,
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              label="Delete"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteRoute(Number(id))}
            />,
          ];
        },
      },
    ],
    [handleDeleteRoute]
  );

  const handleRowUpdate = useCallback(
    async (params: GridCellParams) => {
      await handleUpdateRoute(Number(params.id), {
        [params.field]: params.value,
      });
    },
    [handleUpdateRoute]
  );

  return (
    <DataGrid
      rows={props.rows}
      columns={columns}
      loading={props.isLoading}
      sortModel={props.sortModel}
      filterModel={props.filterModel}
      page={props.page}
      pageSize={props.size}
      rowCount={props.totalElements ?? 0}
      rowsPerPageOptions={[5, 10, 25]}
      disableSelectionOnClick
      disableColumnSelector
      disableDensitySelector
      filterMode="server"
      paginationMode="server"
      sortingMode="server"
      onCellEditStop={handleRowUpdate}
      onFilterModelChange={(model) => {
        props.setFilterModel(model);
      }}
      onSortModelChange={(model) => {
        props.setSortModel(model);
      }}
      onPageChange={(page) => {
        props.setPage(page);
      }}
      onPageSizeChange={(size) => {
        props.setSize(size);
      }}
      components={{
        Footer: RouteGridFooter,
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
          handleClick: () => props.setAddDialogOpen(true),
        },
      }}
      sx={{ pl: 2, pr: 2, border: 'none' }}
    />
  );
};

export default RouteGrid;
