/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/navigator/routes': {
    post: operations['getOrderedRoutes'];
  };
  '/navigator/route': {
    post: operations['getRouteByLength'];
  };
}

export interface components {
  schemas: {
    Coordinates: {
      /** Format: int64 */
      x?: number;
      /** Format: double */
      y?: number;
    };
    Location: {
      /** Format: int32 */
      id?: number;
      /** Format: float */
      x?: number;
      /** Format: double */
      y: number;
      /** Format: double */
      z: number;
      name: string;
    };
    Route: {
      /** Format: int32 */
      id?: number;
      name: string;
      coordinates: components['schemas']['Coordinates'];
      /** Format: date-time */
      creationDate: string;
      from: components['schemas']['Location'];
      to: components['schemas']['Location'];
      /** Format: float */
      distance?: number;
    };
    Response: {
      message?: string;
      payload?: { [key: string]: unknown };
    };
    /** @description Get routes ordered by field (shortest or longest) */
    OrderedRoutesDto: {
      /** Format: int32 */
      idFrom?: number;
      /** Format: int32 */
      idTo?: number;
      orderBy?: string;
    };
    /** @description Get route by length (shortest or longest) */
    LengthFilterDto: {
      /** Format: int32 */
      idFrom?: number;
      /** Format: int32 */
      idTo?: number;
      /** @enum {string} */
      length?: 'SHORTEST' | 'LONGEST';
    };
  };
}

export interface operations {
  getOrderedRoutes: {
    responses: {
      /** Successful operation */
      200: {
        content: {
          'application/json': components['schemas']['Route'][];
        };
      };
      /** Invalid request */
      400: {
        content: {
          'application/json': components['schemas']['Response'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['OrderedRoutesDto'];
      };
    };
  };
  getRouteByLength: {
    responses: {
      /** Successful operation */
      200: {
        content: {
          'application/json': components['schemas']['Route'];
        };
      };
      /** Invalid length */
      400: {
        content: {
          'application/json': components['schemas']['Response'];
        };
      };
      /** Route was not found */
      404: {
        content: {
          'application/json': components['schemas']['Response'];
        };
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['LengthFilterDto'];
      };
    };
  };
}

export interface external {}