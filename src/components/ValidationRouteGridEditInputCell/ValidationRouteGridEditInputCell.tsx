import { GridRenderEditCellParams, GridEditInputCell } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';

const ValidationRouteGridEditInputCell = (props: GridRenderEditCellParams) => {
  const { error } = props;
  return (
    <Tooltip
      open={Boolean(error)}
      title={error}
      componentsProps={{
        tooltip: {
          sx: {
            color: 'error.contrastText',
            backgroundColor: 'error.main',
          },
        },
      }}
    >
      <GridEditInputCell {...props} />
    </Tooltip>
  );
};

export default ValidationRouteGridEditInputCell;
