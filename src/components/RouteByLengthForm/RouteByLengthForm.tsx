import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import { LengthFilterDTO } from '../../types/api';
import { validateId } from '../../utils/validation';

interface RouteByLengthFormProps {
  handleGetRouteByLength: (dto: LengthFilterDTO) => Promise<boolean>;
}

interface RouteByLengthFormValues {
  idFrom: string;
  idTo: string;
  length: 'SHORTEST' | 'LONGEST';
}

const RouteByLengthForm = (props: RouteByLengthFormProps) => {
  const initialValues: RouteByLengthFormValues = {
    idFrom: '',
    idTo: '',
    length: 'SHORTEST',
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<RouteByLengthFormValues> = {};

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
        props.handleGetRouteByLength({
          idFrom: Number(values.idFrom),
          idTo: Number(values.idTo),
          length: values.length,
        });
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Typography variant="h6" component="h2" marginBottom={2}>
            Get route by length
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
              name="length"
              label="Length"
              size="small"
            >
              <MenuItem value="SHORTEST">Shortest</MenuItem>
              <MenuItem value="LONGEST">Longest</MenuItem>
            </Field>
            <Button
              variant="contained"
              onClick={submitForm}
              disabled={isSubmitting}
              sx={{ ml: 'auto' }}
            >
              Get route
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default RouteByLengthForm;
