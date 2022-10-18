import {
  Dialog,
  DialogProps,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useAddRouteMutation } from '../../state/api/routes';
import {
  validateAddedLocation,
  validateDistance,
  validateName,
} from '../../utils/validation';

interface AddRouteDialogProps extends DialogProps {
  handleClose: () => void;
  handleAddResult: (result: any) => void;
}

interface AddRouteDialogFormValues {
  name: string;
  x: number;
  y: number;
  fromId: string;
  fromName: string;
  fromX: string;
  fromY: string;
  fromZ: string;
  toId: string;
  toName: string;
  toX: string;
  toY: string;
  toZ: string;
  distance: number;
}

const AddRouteDialog = (props: AddRouteDialogProps) => {
  const initialValues: AddRouteDialogFormValues = {
    name: '',
    x: 0,
    y: 0,
    fromId: '',
    fromName: '',
    fromX: '',
    fromY: '',
    fromZ: '',
    toId: '',
    toName: '',
    toX: '',
    toY: '',
    toZ: '',
    distance: 2,
  };
  const [addRoute] = useAddRouteMutation();

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: {
            name?: string;
            distance?: string;
            fromId?: string;
            toId?: string;
          } = {};

          const nameError = validateName(values.name);
          if (nameError) {
            errors.name = nameError;
          }

          const distanceError = validateDistance(values.distance);
          if (distanceError) {
            errors.distance = distanceError;
          }

          const fromError = validateAddedLocation({
            id: values.fromId ? Number(values.fromId) : undefined,
            name: values.fromName ? values.fromName : undefined,
            x: values.fromX ? Number(values.fromX) : undefined,
            y: values.fromY ? Number(values.fromY) : undefined,
            z: values.fromZ ? Number(values.fromZ) : undefined,
          });
          if (fromError) {
            errors.fromId = fromError;
          }

          const toError = validateAddedLocation({
            id: values.toId ? Number(values.toId) : undefined,
            name: values.toName ? values.toName : undefined,
            x: values.toX ? Number(values.toX) : undefined,
            y: values.toY ? Number(values.toY) : undefined,
            z: values.toZ ? Number(values.toZ) : undefined,
          });
          if (toError) {
            errors.toId = toError;
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const addResult = await addRoute({
            name: values.name,
            coordinates: {
              x: Number(values.x),
              y: Number(values.y),
            },
            from: {
              id: values.fromId ? Number(values.fromId) : undefined,
              name: values.fromName ? values.fromName : undefined,
              x: values.fromX ? Number(values.fromX) : undefined,
              y: values.fromY ? Number(values.fromY) : undefined,
              z: values.fromZ ? Number(values.fromZ) : undefined,
            },
            to: {
              id: values.toId ? Number(values.toId) : undefined,
              name: values.toName ? values.toName : undefined,
              x: values.toX ? Number(values.toX) : undefined,
              y: values.toY ? Number(values.toY) : undefined,
              z: values.toZ ? Number(values.toZ) : undefined,
            },
            distance: values.distance,
          });
          setSubmitting(false);
          props.handleClose();
          props.handleAddResult(addResult);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Box
              sx={{
                p: 3,
              }}
            >
              <Typography variant="h5" component="h2" marginBottom={2}>
                Add new route
              </Typography>
              <Stack direction="row" gap={3} alignItems="center">
                <Stack gap={2}>
                  <Field
                    component={TextField}
                    type="text"
                    name="name"
                    label="Name"
                    required={false}
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="x"
                    label="X"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="y"
                    label="Y"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="distance"
                    label="Distance"
                  />
                </Stack>
                <Stack gap={2}>
                  <Typography variant="h6" component="h3">
                    From
                  </Typography>
                  <Field
                    component={TextField}
                    type="number"
                    name="fromId"
                    label="Id"
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="fromName"
                    label="Name"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="fromX"
                    label="X"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="fromY"
                    label="Y"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="fromZ"
                    label="Z"
                  />
                </Stack>
                <Stack gap={2}>
                  <Typography variant="h6" component="h3">
                    To
                  </Typography>
                  <Field
                    component={TextField}
                    type="number"
                    name="toId"
                    label="Id"
                  />
                  <Field
                    component={TextField}
                    type="text"
                    name="toName"
                    label="Name"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="toX"
                    label="X"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="toY"
                    label="Y"
                  />
                  <Field
                    component={TextField}
                    type="number"
                    name="toZ"
                    label="Z"
                  />
                </Stack>
              </Stack>
            </Box>
            <DialogActions>
              <Button onClick={props.handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                Add
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddRouteDialog;
