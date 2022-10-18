import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import { OrderedRoutesDTO } from '../../types/api';
import { validateId } from '../../utils/validation';

interface OrderedRoutesFormProps {
  handleGetOrderedRoutes: (dto: OrderedRoutesDTO) => Promise<boolean>;
}

interface OrderedRoutesFormValues {
  idFrom: string;
  idTo: string;
  orderBy: 'name' | 'creationDate' | 'distance';
}

const OrderedRoutesForm = (props: OrderedRoutesFormProps) => {
  const initialValues: OrderedRoutesFormValues = {
    idFrom: '',
    idTo: '',
    orderBy: 'name',
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<OrderedRoutesFormValues> = {};

        const idFromError = validateId(Number(values.idFrom));
        if (idFromError) {
          errors.idFrom = idFromError;
        }

        const idToError = validateId(Number(values.idTo));
        if (idToError) {
          errors.idTo = idToError;
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        props.handleGetOrderedRoutes({
          idFrom: Number(values.idFrom),
          idTo: Number(values.idTo),
          orderBy: values.orderBy,
        });
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Typography variant="h6" component="h2" marginBottom={2}>
            Get ordered routes
          </Typography>
          <Stack direction="row" gap={2} alignItems="flex-start">
            <Field
              component={TextField}
              type="number"
              name="idFrom"
              label="Id From"
              size="small"
            />
            <Field
              component={TextField}
              type="number"
              name="idTo"
              label="Id To"
              size="small"
            />
            <Field
              component={Select}
              type="string"
              name="orderBy"
              label="Order by"
              size="small"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="creationDate">Creation Date</MenuItem>
              <MenuItem value="distance">Distance</MenuItem>
            </Field>
            <Button
              variant="contained"
              onClick={submitForm}
              disabled={isSubmitting}
              sx={{ ml: 'auto' }}
            >
              Get routes
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default OrderedRoutesForm;
