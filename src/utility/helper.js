


export default {
    reactDataValidator: (validationSchema, data, setErrors) => {
        const { error } = validationSchema.validate(data, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details?.forEach((detail) => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return false;
        }
        return true;
    },

    handleChange: (event, setData) => {
        setData((prevalue) => {
            return {
                ...prevalue,
                [event.target.name]: event.target.value
            }
        })
    }

}