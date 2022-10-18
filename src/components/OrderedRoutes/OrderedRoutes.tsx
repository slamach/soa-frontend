import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { OrderedRoutesDTO, Route } from '../../types/api';
import OrderedRoutesForm from '../OrderedRoutesForm/OrderedRoutesForm';

interface OrderedRoutesProps {
  routes: Route[];
  handleGetOrderedRoutes: (dto: OrderedRoutesDTO) => Promise<boolean>;
}

const OrderedRoutes = (props: OrderedRoutesProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <OrderedRoutesForm
        handleGetOrderedRoutes={props.handleGetOrderedRoutes}
      />
      <TableContainer component={Box} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">X</TableCell>
              <TableCell align="right">Y</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell align="right">Distance</TableCell>
            </TableRow>
          </TableHead>
          {props.routes.length > 0 && (
            <TableBody>
              {Array.from(Array(10).keys()).map(() => {
                let route = props.routes[0];
                return (
                  <TableRow>
                    <TableCell>{route.name}</TableCell>
                    <TableCell align="right">{route.coordinates.x}</TableCell>
                    <TableCell align="right">{route.coordinates.y}</TableCell>
                    <TableCell>
                      {new Date(route.creationDate).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>{`${route.from.id}: ${route.from.name}`}</TableCell>
                    <TableCell>{`${route.to.id}: ${route.to.name}`}</TableCell>
                    <TableCell align="right">{route.distance}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderedRoutes;
