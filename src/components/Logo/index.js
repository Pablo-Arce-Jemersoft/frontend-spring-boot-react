import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
// eslint-disable-next-line no-unused-vars
import { ButtonBase } from '@mui/material';

// project import
// eslint-disable-next-line no-unused-vars
import Logo from './Logo';
import config from 'config';
import { Typography } from '../../../node_modules/@mui/material/index';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
        <Logo />
        <Typography>Admin App</Typography>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
