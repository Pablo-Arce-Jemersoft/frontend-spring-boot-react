import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import FirebaseSocial from '../authentication/auth-forms/FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { MenuItem, Select } from '../../../node_modules/@mui/material/index';

// ============================|| FIREBASE - REGISTER ||============================ //

const NewOrder = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    productName: '',
                    totalOrder: '',
                    status: '',
                    company: '',
                    submit: false
                }}
                validationSchema={Yup.object().shape({
                    // productName: Yup.string().max(255).required('Product Name is required'),
                    // totalOrder: Yup.string().max(255).required('Total Order is required'),
                    // status: Yup.string().max(255).required('Status is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values);
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="product-name">Product Name</InputLabel>
                                    <OutlinedInput
                                        id="product-name"
                                        type="productName"
                                        value={values.productName}
                                        name="productName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.productName && errors.productName)}
                                    />
                                    {touched.productName && errors.productName && (
                                        <FormHelperText error id="helper-text-product-name">
                                            {errors.productName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="total-order">Total Order</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.totalOrder && errors.totalOrder)}
                                        id="total-order"
                                        type="totalOrder"
                                        value={values.totalOrder}
                                        name="totalOrder"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.totalOrder && errors.totalOrder && (
                                        <FormHelperText error id="helper-text-total-order">
                                            {errors.totalOrder}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            error={Boolean(touched.status && errors.status)}
                                            id="status"
                                            onChange={(e) => {
                                                handleChange;
                                                values.status = e.target.value;
                                            }}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={'Approved'}>Approved</MenuItem>
                                            <MenuItem value={'Pending'}>Pending</MenuItem>
                                            <MenuItem value={'Rejected'}>Rejected</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {touched.status && errors.status && (
                                        <FormHelperText error id="helper-text-status">
                                            {errors.status}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Company</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.company && errors.company)}
                                        id="company-signup"
                                        value={values.company}
                                        name="company"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Demo Inc."
                                        inputProps={{}}
                                        autocomplete={false}
                                    />
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}error message from the server</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add New Order
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default NewOrder;
