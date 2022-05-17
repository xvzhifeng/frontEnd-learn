import React, { useState, useEffect } from 'react';
import GenericTemplate from "components/templates/GenericTemplate";
import SectionForm from "pages/SectionForm"
import * as sectionService from "services/SectionService"

import useTable from "components/useTable";
import Popup from "components/Popup";
import Controls from "components/controls/Controls";
//import LoadingProgress from 'components/LoadingProgress';

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';

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
        width: '50%',
        margin: theme.spacing(2),
    },
    searchCityInput: {
        width: '20%',
        margin: theme.spacing(2),
    },
    searchKinds: {
        width: '20%',
        margin: theme.spacing(2),
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'id', label: 'People ID' },
    { id: 'name', label: 'People Name' },
    { id: 'sex', label: 'Sex' },
    { id: 'wockerDate', label: 'WockerDate' },
    { id: 'manager', label: 'Manager' },
    { id: 'city', label: 'City' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]


const peoples = [
    {
        id: 1094,
        name: 'Paul',
        sex: 1,
        wockerDate: '1977-12-29',
        manager: 'Melissa',
        city: '重庆 重庆市'
    },
    {
        id: 1095,
        name: 'John',
        sex: 0,
        wockerDate: '1979-02-02',
        manager: 'Eric',
        city: '安徽省 芜湖市'
    },
]

const SectionPage = () => {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(peoples)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [searchKind, setsearchKind] = useState(0)
    const [searchValue, setSearchValue] = useState("")
    const [searchCity, setSearchCity] = useState("")

    function getAllPeoples() {
        sectionService.getAllPeoples().then(data => {
            setRecords(data)
        });
    }
    useEffect(() => {
        getAllPeoples()
    }, [])
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        let kinds = sectionService.getSearchKindCollection()
        let value = target.value
        console.log(target.value)
        if(kinds[searchKind].title === "sex" &&  target.value == "male") {
            value = 1
        } else if(kinds[searchKind].title === "sex" &&  target.value == "female") {
            value = 0
        }
        let conditions = new Array()
        conditions.push({"name":kinds[searchKind].title, "value":value})
        conditions.push({"name":"city", "value":searchCity})
        setSearchValue(value)
        sectionService.searchMultiple(conditions).then(data=>{
            console.log(data)
            setRecords(data)
        })
        // sectionService.searchPeople(kinds[searchKind].title, value).then(data=>{
        //     console.log(data)
        //     setRecords(data)
        // })
        
    }

    const handleSearchCity = e => {
        let target = e.target;
        let value = target.value
        let kinds = sectionService.getSearchKindCollection()
        console.log(target.value)
        setSearchCity(value)
        let conditions = new Array()
        conditions.push({"name":kinds[searchKind].title, "value":searchValue})
        conditions.push({"name":"city", "value":value})
        sectionService.searchMultiple(conditions).then(data=>{
            console.log(data)
            setRecords(data)
        })
    }

    const handleSearchKind = e =>{
        let target = e.target;
        let kinds = sectionService.getSearchKindCollection()
        setsearchKind(target.value)
        if(searchValue !== "") {
            sectionService.searchPeople(kinds[target.value].title, searchValue).then(data=>{
                setRecords(data)
            })
        }
        console.log(target)
        console.log(kinds[target.value].title)
    }


    const addOrEdit = (people, resetForm) => {
        if (people.id === 0) {
            sectionService.insertPeople(people).then(
                () => {
                    getAllPeoples()
                }
            )
        }
        else {
            sectionService.updatePeople(people).then(
                () => {
                    getAllPeoples()
                }
            )
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const confirm = useConfirm();

    const removeProduct = (item) => {
        confirm({ title: '確認', description: '用户' + item.name + 'を削除してよろしいでしょうか' })
            .then(() => {
                sectionService.removePeople(item).then(() => {
                    getAllPeoples()
                })
            })
            .catch(() => { console.log("ConfirmBox Error") });
    }

    return (
        <GenericTemplate title="社员一覧">

            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="社员検索"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Select
                        name="kind"
                        label="kind"
                        className={classes.searchKinds}
                        value={searchKind}
                        onChange={handleSearchKind}
                        options={sectionService.getSearchKindCollection()}
                        
                    />
                    <Controls.Input
                        label="city検索"
                        className={classes.searchCityInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearchCity}
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
                                <TableCell>{item.sexName}</TableCell>
                                <TableCell>{item.wockerDate}</TableCell>
                                <TableCell>{item.manager}</TableCell>
                                <TableCell>{item.city}</TableCell>
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
                title={(recordForEdit === null) ? '社员追加' : '社员編集'}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SectionForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </GenericTemplate>
    )
};

export default SectionPage;