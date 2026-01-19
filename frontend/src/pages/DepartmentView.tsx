import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState, useEffect, ChangeEvent } from 'react';
import { GET_DEPARTMENT } from '../graphql/queries';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_EMPLOYEE, UPDATE_DEPARTMENT } from '../graphql/mutations';
import { GET_DEPARTMENT as GET_DEPARTMENT_QUERY } from '../graphql/queries';
import Layout from '../components/Layout';

const DepartmentView = () => {
  const navigate = useNavigate();
  const departmentId = useMemo(() => '11557', []);
  const [activeTab, setActiveTab] = useState<'personal' | 'financial'>('personal');
  const [personalDialogOpen, setPersonalDialogOpen] = useState(false);
  const [financialDialogOpen, setFinancialDialogOpen] = useState(false);
  const [personalForm, setPersonalForm] = useState({
    nationalIdNumber: '',
    nationalIdExpiry: '',
    firstName: '',
    fatherName: '',
    familyName: '',
    nationality: '',
    passportNo: '',
    passportExpiryDate: '',
    personalEmail: '',
    mobile: '',
  });
  const [financialForm, setFinancialForm] = useState({
    bankName: '',
    iban: '',
  });

  const editButtonSx = useMemo(
    () => ({
      bgcolor: '#0B5ED7',
      borderRadius: '6px',
      textTransform: 'none',
      fontWeight: 600,
      minWidth: 96,
      height: 36,
      boxShadow: 'none',
      '&:hover': { bgcolor: '#0A58CA', boxShadow: 'none' },
    }),
    [],
  );

  const { loading, error, data, refetch } = useQuery(GET_DEPARTMENT, {
    variables: { id: departmentId },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_DEPARTMENT_QUERY, variables: { id: departmentId } }],
    onCompleted: () => {
      refetch();
    },
  });

  const [updateDepartment, { loading: updating }] = useMutation(UPDATE_DEPARTMENT, {
    refetchQueries: [{ query: GET_DEPARTMENT_QUERY, variables: { id: departmentId } }],
    onCompleted: () => {
      setPersonalDialogOpen(false);
      setFinancialDialogOpen(false);
    },
  });

  const handleDeleteEmployee = useCallback(
    async (employeeId: string) => {
      if (window.confirm('Are you sure you want to delete this employee?')) {
        try {
          await deleteEmployee({
            variables: {
              departmentId,
              employeeId,
            },
          });
        } catch (err) {
          console.error('Error deleting employee:', err);
        }
      }
    },
    [deleteEmployee, departmentId],
  );

  const department = data?.department;
  const employees = department?.employees || [];

  useEffect(() => {
    if (!department) return;

    if (department.basicInformation) {
      setPersonalForm((prev) => ({
        ...prev,
        nationalIdNumber: department.basicInformation.nationalIdNumber || '',
        nationalIdExpiry: department.basicInformation.nationalIdExpiry || '',
        firstName: department.basicInformation.firstName || '',
        fatherName: department.basicInformation.fatherName || '',
        familyName: department.basicInformation.familyName || '',
        nationality: department.basicInformation.nationality || '',
        passportNo: department.basicInformation.passportNo || '',
        passportExpiryDate: department.basicInformation.passportExpiryDate || '',
        personalEmail: department.contactInformation?.personalEmail || '',
        mobile: department.contactInformation?.mobile || '',
      }));
    }

    if (department.bankInformation) {
      setFinancialForm({
        bankName: department.bankInformation.bankName || '',
        iban: department.bankInformation.iban || '',
      });
    }
  }, [department]);

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

  if (!department) {
    return (
      <Box p={3}>
        <Alert severity="warning">Department not found</Alert>
      </Box>
    );
  }

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <Box>
      <Typography sx={{ color: '#98A2B3', fontSize: 12, mb: 0.5 }}>{label}</Typography>
      <Typography sx={{ color: '#101828', fontSize: 14, fontWeight: 600 }}>{value}</Typography>
    </Box>
  );

  const handlePersonalChange =
    (field: keyof typeof personalForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setPersonalForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleFinancialChange =
    (field: keyof typeof financialForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setFinancialForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSavePersonal = async () => {
    await updateDepartment({
      variables: {
        id: departmentId,
        input: {
          basicInformation: {
            nationalIdNumber: personalForm.nationalIdNumber,
            nationalIdExpiry: personalForm.nationalIdExpiry,
            firstName: personalForm.firstName,
            fatherName: personalForm.fatherName,
            familyName: personalForm.familyName,
            nationality: personalForm.nationality,
            passportNo: personalForm.passportNo,
            passportExpiryDate: personalForm.passportExpiryDate,
          },
          contactInformation: {
            personalEmail: personalForm.personalEmail,
            mobile: personalForm.mobile,
          },
        },
      },
    });
  };

  const handleSaveFinancial = async () => {
    await updateDepartment({
      variables: {
        id: departmentId,
        input: {
          bankInformation: {
            bankName: financialForm.bankName,
            iban: financialForm.iban,
          },
        },
      },
    });
  };

  const personalContent = (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* Basic Information */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Basic Information
            </Typography>
            <Button variant="contained" sx={editButtonSx} onClick={() => setPersonalDialogOpen(true)}>
              Edit
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="National ID Number"
                value={department.basicInformation?.nationalIdNumber || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="National ID Expiring Date"
                value={department.basicInformation?.nationalIdExpiry || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Title" value={department.basicInformation?.title || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Family Name" value={department.basicInformation?.familyName || '-'} />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoItem label="First Name" value={department.basicInformation?.firstName || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Father Name" value={department.basicInformation?.fatherName || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="Grand Father Name"
                value={department.basicInformation?.grandFatherName || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="اللقب / اسم العائلة"
                value={department.basicInformation?.familyNameAr || '-'}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoItem label="الاسم الأول" value={department.basicInformation?.firstNameAr || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="اسم الأب" value={department.basicInformation?.fatherNameAr || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="اسم الجد" value={department.basicInformation?.grandFatherNameAr || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Nationality" value={department.basicInformation?.nationality || '-'} />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoItem label="Date of birth" value={department.basicInformation?.dateOfBirth || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Gender" value={department.basicInformation?.gender || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="Additional Nationality"
                value={department.basicInformation?.additionalNationality || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Passport No." value={department.basicInformation?.passportNo || '-'} />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoItem
                label="Passport Issue Date"
                value={department.basicInformation?.passportIssueDate || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="Passport Expiry Date"
                value={department.basicInformation?.passportExpiryDate || '-'}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Marital Status" value={department.basicInformation?.maritalStatus || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Dependencies" value={department.basicInformation?.dependencies || '-'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Contact Information
            </Typography>
            <Button variant="contained" sx={editButtonSx} onClick={() => setPersonalDialogOpen(true)}>
              Edit
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoItem
                label="Personal Email"
                value={department.contactInformation?.personalEmail || '-'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem label="Mobile" value={department.contactInformation?.mobile || '-'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Emergency Contacts
            </Typography>
            <Button variant="contained" sx={editButtonSx} onClick={() => setPersonalDialogOpen(true)}>
              Edit
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <InfoItem
                label="Emergency Contact Person Name"
                value={department.emergencyContacts?.contactName || '-'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Emergency Relation" value={department.emergencyContacts?.relation || '-'} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Emergency Phone" value={department.emergencyContacts?.phone || '-'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address Details */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Address Details
            </Typography>
            <Button variant="contained" sx={editButtonSx} onClick={() => setPersonalDialogOpen(true)}>
              Edit
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoItem label="Country" value={department.addressDetails?.country || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="City" value={department.addressDetails?.city || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Postal Code" value={department.addressDetails?.postalCode || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Building" value={department.addressDetails?.building || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Street" value={department.addressDetails?.street || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Floor No." value={department.addressDetails?.floorNo || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Apartment" value={department.addressDetails?.apartment || '-'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Driving License Details */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Driving License Details
            </Typography>
            <Button variant="contained" sx={editButtonSx} onClick={() => setPersonalDialogOpen(true)}>
              Edit
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoItem label="Driving License" value={department.drivingLicense?.hasLicense || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Driving License Type" value={department.drivingLicense?.type || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem
                label="Driving License expiry date"
                value={department.drivingLicense?.expiryDate || '-'}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Military Status */}
      <Card className="shadow-lg" sx={{ borderRadius: '16px' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
              Military Status
            </Typography>
            <Button variant="contained" sx={editButtonSx}>
              Edit
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoItem label="Require Travel Permit" value={department.militaryStatus?.requireTravelPermit || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Military Status" value={department.militaryStatus?.status || '-'} />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoItem label="Document" value={department.militaryStatus?.document || '-'} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  const financialContent = (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#101828' }}>
            Bank Information
          </Typography>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            sx={editButtonSx}
            onClick={() => setFinancialDialogOpen(true)}
          >
            Edit
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <InfoItem label="Bank Name" value={department.bankInformation?.bankName || '-'} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="p-4">
              <InfoItem label="IBAN" value={department.bankInformation?.iban || '-'} />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const personalDialog = (
    <Dialog open={personalDialogOpen} onClose={() => setPersonalDialogOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Edit Personal Information</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="National ID Number"
            value={personalForm.nationalIdNumber}
            onChange={handlePersonalChange('nationalIdNumber')}
          />
          <TextField
            label="National ID Expiry"
            value={personalForm.nationalIdExpiry}
            onChange={handlePersonalChange('nationalIdExpiry')}
          />
          <TextField
            label="First Name"
            value={personalForm.firstName}
            onChange={handlePersonalChange('firstName')}
          />
          <TextField
            label="Father Name"
            value={personalForm.fatherName}
            onChange={handlePersonalChange('fatherName')}
          />
          <TextField
            label="Family Name"
            value={personalForm.familyName}
            onChange={handlePersonalChange('familyName')}
          />
          <TextField
            label="Nationality"
            value={personalForm.nationality}
            onChange={handlePersonalChange('nationality')}
          />
          <TextField
            label="Passport No."
            value={personalForm.passportNo}
            onChange={handlePersonalChange('passportNo')}
          />
          <TextField
            label="Passport Expiry Date"
            value={personalForm.passportExpiryDate}
            onChange={handlePersonalChange('passportExpiryDate')}
          />
          <TextField
            label="Personal Email"
            value={personalForm.personalEmail}
            onChange={handlePersonalChange('personalEmail')}
          />
          <TextField
            label="Mobile"
            value={personalForm.mobile}
            onChange={handlePersonalChange('mobile')}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPersonalDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSavePersonal} disabled={updating}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  const financialDialog = (
    <Dialog open={financialDialogOpen} onClose={() => setFinancialDialogOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>Edit Financial Information</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Bank Name"
            value={financialForm.bankName}
            onChange={handleFinancialChange('bankName')}
          />
          <TextField label="IBAN" value={financialForm.iban} onChange={handleFinancialChange('iban')} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setFinancialDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveFinancial} disabled={updating}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Layout title="John Smith Profile">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <Card className="shadow-md">
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1.5}>
                <Box
                  component="img"
                  src="/profile.png"
                  alt={department.manager || 'Profile'}
                  sx={{ width: 96, height: 96, borderRadius: '16px', objectFit: 'cover' }}
                />
                <Typography variant="h6" fontWeight={700}>
                  {`${department.basicInformation?.firstName ?? ''} ${department.basicInformation?.familyName ?? ''}`.trim() ||
                    department.manager ||
                    'John Smith'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Senior Product Manager
                </Typography>
              </Box>
              <Box mt={3} display="flex" flexDirection="column" gap={1}>
                <Button
                  variant={activeTab === 'personal' ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  onClick={() => setActiveTab('personal')}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    borderRadius: '12px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    bgcolor: activeTab === 'personal' ? '#EEF4FF' : 'transparent',
                    color: activeTab === 'personal' ? '#1D4ED8' : '#101828',
                    borderColor: 'transparent',
                    '&:hover': {
                      bgcolor: activeTab === 'personal' ? '#E0EAFF' : 'rgba(15, 23, 42, 0.04)',
                      borderColor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Personal Information
                </Button>
                <Button
                  variant={activeTab === 'financial' ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  onClick={() => setActiveTab('financial')}
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    borderRadius: '12px',
                    fontWeight: 600,
                    boxShadow: 'none',
                    bgcolor: activeTab === 'financial' ? '#EEF4FF' : 'transparent',
                    color: activeTab === 'financial' ? '#1D4ED8' : '#101828',
                    borderColor: 'transparent',
                    '&:hover': {
                      bgcolor: activeTab === 'financial' ? '#E0EAFF' : 'rgba(15, 23, 42, 0.04)',
                      borderColor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Financial Information
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {activeTab === 'personal' ? personalContent : financialContent}
          {personalDialog}
          {financialDialog}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DepartmentView;
