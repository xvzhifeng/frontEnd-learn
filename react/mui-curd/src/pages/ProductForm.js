import React, { useCallback, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "components/controls/Controls";
import { useForm, Form } from 'components/useForm';
import * as ProductService from "services/ProductService";

import * as yup from 'yup';

const initialFValues = {
    id: 0,
    name: '',
    category:0,
    weight: 0,
    price: 0
}

export default function ProductForm(props) {
    const { addOrEdit, recordForEdit } = props
   
    const handleSubmit = e => {
        e.preventDefault();
        validateForm(addOrEdit);
        //addOrEdit(values, resetForm);
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const categoryIDs= ProductService.getCategoryCollection().map(element => element.id);

    const schema = yup.object().shape({
        name: yup.string().required('名前は必須項目です'),
        category: yup.number().required('種類は必須項目です')
            .typeError('正しい種類を選択してください')
            .oneOf(categoryIDs,"正しい種類を選んでください"),
        weight: yup.number().required('重量は必須項目です')
          .typeError('数字を入力してください')
          .positive('正の数を指定してください')
          .integer('整数で指定してください'),
        price: yup.number().required('価格は必須項目です')
        .typeError('数字を入力してください')
        .positive('正の数を指定してください')
        .integer('整数で指定してください'),
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
                        label="商品名"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Select
                        name="category"
                        label="種類"
                        value={values.category}
                        onChange={handleInputChange}
                        options={ProductService.getCategoryCollection()}
                        error={errors.category}
                    />
                    <Controls.Input
                        label="重さ"
                        name="weight"
                        value={values.weight}
                        onChange={handleInputChange}
                        error={errors.weight}
                    />
                    <Controls.Input
                        label="価格"
                        name="price"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
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
