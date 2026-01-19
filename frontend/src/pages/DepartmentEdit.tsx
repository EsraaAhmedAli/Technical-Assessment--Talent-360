import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { GET_DEPARTMENT } from '../graphql/queries';
import { UPDATE_DEPARTMENT } from '../graphql/mutations';
import Layout from '../components/Layout';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface DepartmentFormData {
  name: string;
  description: string;
  localization: {
    name: string;
    description: string;
  };
  manager: string;
  location: string;
  status: boolean;
}

const DepartmentEdit = () => {
  const navigate = useNavigate();
  // Use the department code from static data
  const departmentId = useMemo(() => '11557', []);

  const { loading, error, data } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId },
    fetchPolicy: 'cache-and-network',
  });

  const [updateDepartment, { loading: updating }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      navigate('/');
    },
    onError: (err) => {
      console.error('Error updating department:', err);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    defaultValues: {
      name: '',
      description: '',
      localization: {
        name: '',
        description: '',
      },
      manager: '',
      location: '',
      status: true,
    },
    values: data?.department
      ? {
          name: data.department.name || '',
          description: data.department.description || '',
          localization: {
            name: data.department.localization?.name || '',
            description: data.department.localization?.description || '',
          },
          manager: data.department.manager || '',
          location: data.department.location || '',
          status: data.department.status ?? true,
        }
      : undefined,
  });

  const onSubmit = useCallback(
    async (formData: DepartmentFormData) => {
      try {
        await updateDepartment({
          variables: {
            id: departmentId,
            input: {
              name: formData.name,
              description: formData.description,
              localization: {
                name: formData.localization.name,
                description: formData.localization.description,
              },
              manager: formData.manager,
              location: formData.location,
              status: formData.status,
            },
          },
        });
      } catch (err) {
        console.error('Error:', err);
      }
    },
    [updateDepartment, departmentId],
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">Error loading department: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Layout title="John Smith Profile">
      <Box maxWidth="1200px" mx="auto">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h4" component="h1" className="font-bold">
                Edit Department
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
              >
                Back
              </Button>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {/* Department Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Department name is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Department Name"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Localized Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="localization.name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Department Name (Localized)"
                        fullWidth
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Localized Description */}
                <Grid item xs={12}>
                  <Controller
                    name="localization.description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description (Localized)"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Manager */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="manager"
                    control={control}
                    rules={{ required: 'Manager is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Manager"
                        fullWidth
                        error={!!errors.manager}
                        helperText={errors.manager?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: 'Location is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Location"
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* Status */}
                <Grid item xs={12}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="Active Status"
                      />
                    )}
                  />
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/')}
                      disabled={updating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={updating ? <CircularProgress size={20} /> : <SaveIcon />}
                      disabled={updating}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {updating ? 'Saving...' : 'Save'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default DepartmentEdit;
