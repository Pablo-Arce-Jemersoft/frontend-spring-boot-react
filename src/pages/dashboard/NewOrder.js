// material-ui
import { Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { IconButton, InputAdornment, MenuItem, Select } from '../../../node_modules/@mui/material/index';
import { ProductsModel } from 'models/ProductsModel';

// ============================|| FIREBASE - REGISTER ||============================ //

const NewOrder = () => {
    const formInitialState = {
        productName: '',
        totalOrder: '',
        status: '',
        totalAmount: '',
        unitPrice: '',
        submit: false
    };

    return (
        <>
            <Formik
                initialValues={formInitialState}
                validationSchema={Yup.object().shape({
                    productName: Yup.string().max(255).required('Product Name is required'),
                    totalOrder: Yup.number().min(1).max(100).required('Total Order is required'),
                    status: Yup.string().max(255).required('Status is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    values.totalAmount = values.unitPrice * values.totalOrder;
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                        resetForm({ formInitialState });
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
                                    <FormControl fullWidth>
                                        <Select
                                            id="product-name"
                                            type="productName"
                                            value={values.productName}
                                            name="productName"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                values.unitPrice =
                                                    ProductsModel[
                                                        ProductsModel.findIndex((product) => product.name === e.target.value)
                                                    ].unitPrice;
                                            }}
                                            fullWidth
                                            error={Boolean(touched.productName && errors.productName)}
                                        >
                                            {ProductsModel.map((product) => (
                                                <MenuItem value={product.name} key={product.name}>
                                                    {product.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
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
                                        type="number"
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
                                            id="status"
                                            type="status"
                                            value={values.status}
                                            name="status"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                            error={Boolean(touched.status && errors.status)}
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
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="unit-price">Unit Price</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="unit-price"
                                        readOnly
                                        value={values.unitPrice}
                                        name="unitPrice"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}error message from the server</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="total-amount">Total Amount</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="total-amount"
                                        readOnly
                                        value={values.unitPrice * values.totalOrder}
                                        name="totalAmount"
                                        onBlur={handleBlur}
                                        onChange={() => {
                                            values.totalAmount = values.unitPrice * values.totalOrder;
                                        }}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
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
