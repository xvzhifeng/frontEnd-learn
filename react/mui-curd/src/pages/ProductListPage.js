import React, { useState } from 'react';
import GenericTemplate from "components/templates/GenericTemplate";
import ProductForm from "pages/ProductForm"
import * as productService from "services/ProductService"

import useTable from "components/useTable";
import Popup from "components/Popup";
import  Controls from "components/controls/Controls";
//import LoadingProgress from 'components/LoadingProgress';

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';

import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

import { useConfirm } from 'material-ui-confirm';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'id', label: 'Product ID' },
    { id: 'name', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'weight', label: 'Weight' },
    { id: 'price', label: 'Price' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const ProductPage = () => {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(productService.getAllProducts());
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (product, resetForm) => {
        if (product.id === 0)
            productService.insertProduct(product)
        else
            productService.updateProduct(product)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(productService.getAllProducts())
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const confirm = useConfirm();

    const removeProduct = (item) => {
        confirm({title:'確認', description: '商品' + item.name+ 'を削除してよろしいでしょうか' })
        .then(() => { 
            productService.removeProduct(item)
            setRecords(productService.getAllProducts())
            })
        .catch(() => { console.log("ConfirmBox Error")});
     }

    return (
        <GenericTemplate title="商品一覧">

            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="商品検索"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="作成"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.categoryName}</TableCell>
                                    <TableCell>{item.weight}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => { removeProduct(item) }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title={(recordForEdit === null) ?'商品追加':'商品編集'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ProductForm
                   recordForEdit={recordForEdit}
                   addOrEdit={addOrEdit} />
            </Popup>
       </GenericTemplate>
    )
};

export default ProductPage;