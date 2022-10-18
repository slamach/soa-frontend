import Container from '@mui/material/Container';
import { useCallback, useState } from 'react';
import OrderedRoutes from '../../components/OrderedRoutes/OrderedRoutes';
import RouteByLengthForm from '../../components/RouteByLengthForm/RouteByLengthForm';
import { useProcessResult } from '../../hooks/useProcessResult';
import {
  useLazyGetOrderedRoutesQuery,
  useLazyGetRouteByLengthQuery,
} from '../../state/api/navigator';
import { LengthFilterDTO, OrderedRoutesDTO, Route } from '../../types/api';
const Navigator = () => {
  const { processResult } = useProcessResult();

  const [orderedRoutes, setOrderedRoutes] = useState<Route[]>([]);

  const [getRouteByLength] = useLazyGetRouteByLengthQuery();
  const [getOrderedRoutes] = useLazyGetOrderedRoutesQuery();

  const handleGetRouteByLength = useCallback(
    async (dto: LengthFilterDTO) => {
      const result = await getRouteByLength(dto);
      return processResult(
        result,
        `${dto.length.charAt(0) + dto.length.toLowerCase().slice(1)} route: ${
          result.data?.name
        }`
      );
    },
    [getRouteByLength, processResult]
  );

  const handleGetOrderedRoutes = useCallback(
    async (dto: OrderedRoutesDTO) => {
      const result = await getOrderedRoutes(dto);
      if (processResult(result, 'Successfully got ordered routes')) {
        setOrderedRoutes(result.data ?? []);
        return true;
      }
      return false;
    },
    [getOrderedRoutes, processResult]
  );

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 2,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        height: '100%',
      }}
    >
      <RouteByLengthForm handleGetRouteByLength={handleGetRouteByLength} />
      <OrderedRoutes
        routes={orderedRoutes}
        handleGetOrderedRoutes={handleGetOrderedRoutes}
      />
    </Container>
  );
};

export default Navigator;
