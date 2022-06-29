import React, { useEffect, useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import {
    Dialog, DialogContent,
    DialogTitle,
    IconButton,
    useMediaQuery,
    makeStyles,
    Typography
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { GlobalContext } from 'context/GlobalState';


/**
* タイトルエリアのスタイル
*/

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(0)
    },
    dialogTitle: {
        padding: theme.spacing(0),
        backgroundColor: '#333',
        '& *': {
            fontWeight: 'bold',
            color: '#fff'
        }
    }
}))

function ModalDialog(props: any) {

    // プロパティ
    const {
        title,
        onClose,
        open,
        maxWidth,
    } = props;

    // ダイアログ表示状態
    //const [dialogOpen, setDialogOpen] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { aboutDlgOpen, openAboutDlg, closeAboutDlg } = useContext(GlobalContext);

    // openの値が変化した時
    useEffect(() => (open ? openAboutDlg() : closeAboutDlg()), [open]);

    // ダイアログクローズ
    const handleClose = () => {
        closeAboutDlg();
        onClose();
    };

    const classes = useStyles();

    return (
        <Dialog open={aboutDlgOpen} fullWidth={true} fullScreen={fullScreen} maxWidth={maxWidth}
            classes={{ paper: classes.dialogWrapper }}>

            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', padding: '0px 0px 0px 8px' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, top: 0, bottom: 0, margin: 'auto' }}>
                        {title}
                    </Typography>
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    );
}

// プロパティ
ModalDialog.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.element,
    maxWidth: PropTypes.string
};

export default ModalDialog;