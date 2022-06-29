import React, { useCallback, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as SectionService from "../services/SectionService";

import * as yup from 'yup';

const initialFValues = {
    id: 0,
    name: '',
    sex: -1,
    wockerDate: "",
    manager: '',
    city: '',
}

export default function SectionForm(props) {
    const { addOrEdit, recordForEdit } = props

    const handleSubmit = e => {
        e.preventDefault();
        validateForm(addOrEdit);
        //addOrEdit(values, resetForm);
    }

    useEffect(() => {
        if (recordForEdit != null) {
            setValues({
                ...recordForEdit
            })
            console.log(values)
        }
            
    }, [recordForEdit])

    const sexIds = SectionService.getSexCollection().map(element => element.id);

    const schema = yup.object().shape({
        name: yup.string().required('名前は必須項目です'),
        sex: yup.number().required('種類は必須項目です')
            .typeError('正しい種類を選択してください')
            .oneOf(sexIds, "正しい種類を選んでください"),
        wockerDate: yup.date(),
        manager: yup.string().required('経理は必須項目です'),
        city: yup.string().required('都市は必須項目です'),
    });

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        validateForm
    } = useForm(initialFValues, true, schema);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Controls.Input
                        name="name"
                        label="社员名"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Select
                        name="sex"
                        label="性別"
                        value={values.sex}
                        onChange={handleInputChange}
                        options={SectionService.getSexCollection()}
                        error={errors.sex}
                    />
                    <Controls.InputDate
                        label="労働時間"
                        name="wockerDate"
                        value={values.wockerDate}
                        onChange={handleInputChange}
                        error={errors.wockerDate}
                    />
                    <Controls.Input
                        label="経理"
                        name="manager"
                        value={values.manager}
                        onChange={handleInputChange}
                        error={errors.manager}
                    />
                    <Controls.Input
                        label="都市"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                </Grid>

            </Grid>
        </Form>
    )
}
