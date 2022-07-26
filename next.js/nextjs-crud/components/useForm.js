import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core'
import update from 'immutability-helper'
import * as yup from 'yup';

export function useForm(initialFValues, validateOnChange = false, validateSchema) {

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  //  用于恢复初始值
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({})
  }

  const validateField = async (value) => {
    /**
     * ES5 引入了Object.keys方法，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键名。
     */
    const fieldPath = Object.keys(value)[0];
    // Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（ enumerable ）属性的键值
    const fieldValue = Object.values(value)[0];
    var myerrors = { [fieldPath]: null };
    var isValid = false;

    try {
      const fieldSchema = yup.reach(validateSchema, fieldPath);
      isValid = await fieldSchema.isValid(fieldValue, {
        abortEarly: false, // Prevent aborting validation after first error
      })
      if (isValid) {
        console.log('Validation is OK')
      } else {
        await validateSchema.validate(value, {
          abortEarly: false
        }).catch((err) => {
          const fieldError = err.inner.filter((error) => error.path === fieldPath);
          if (fieldError)
            myerrors = {
              [fieldError[0].path]: fieldError[0].message
            }
        })
      }
    } catch (e) {
      console.log('error occurred at field validation');
      myerrors = {
        [fieldPath]: '未知例外が発生した'
      };
    }

    // Update form errors state:
    setErrors((prevErrors = errors) =>
      update(prevErrors, {
        $set: myerrors,
      }))

    return isValid
  }

  const validateForm = async (addOrEdit) => {
    const fieldValues = values;

    // When the abortEarly option is false this is where you can inspect each error thrown, alternatively, errors will have all of the messages from each inner error.
    const isValid = await validateSchema.isValid(fieldValues, {
      abortEarly: false, // Prevent aborting validation after first error
    })
    if (isValid) {
      console.log('Validation is OK')
      addOrEdit(values, resetForm);
    } else {
      // If form is not valid, check which fields are incorrect:
      validateSchema.validate(fieldValues, {
        abortEarly: false
      }).then(result => {
        console.log(result); // it is the value of `val`
        addOrEdit(values, resetForm);
      }).catch((err) => {
        // Collect all errors in { fieldName: boolean } format:
        const myerrors = err.inner.reduce((acc, error) => {
          return {
            ...acc,
            [error.path]: error.message,
          }
        }, {})

        // Update form errors state:
        setErrors((prevErrors = errors) =>
          update(prevErrors, {
            $set: myerrors,
          }))
      })
    }
  }
  // useCallback 返回一个函数，只有当value发生变化时才会返回新的函数，用于优化性能
  const handleInputChange = useCallback(e => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
    if (validateOnChange) {
      // 检测当个field是否符合要求
      validateField({
        [name]: value
      })
    }
  }, [values])

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    validateForm
  }
}


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}))

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;

  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  )
}