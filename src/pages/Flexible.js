import Joi from 'joi';

const defaultMessages = {
    'string.email': '{#label} must be a valid email',
    'string.empty': '{#label} is not allowed to be empty',
    'any.required': '{#label} is required',
    'string.min': '{#label} should have at least {#limit} characters',
    'string.max': '{#label} should have at most {#limit} characters',
    'number.base': '{#label} must be a number',
    'number.min': '{#label} should be greater than or equal to {#limit}',
    'number.max': '{#label} should be less than or equal to {#limit}',
    'date.base': '{#label} must be a valid date',
};

const createFieldSchema = (field) => {
    let schema;
    switch (field.type) {
        case 'string':
            schema = Joi.string();
            if (field.min) schema = schema.min(field.min);
            if (field.max) schema = schema.max(field.max);
            break;
        case 'email':
            schema = Joi.string().email({ tlds: { allow: false } });
            break;
        case 'number':
            schema = Joi.number();
            if (field.min !== undefined) schema = schema.min(field.min);
            if (field.max !== undefined) schema = schema.max(field.max);
            break;
        case 'date':
            schema = Joi.date();
            break;
        default:
            schema = Joi.any();
    }

    if (field.required) {
        schema = schema.required();
    }

    const messages = { ...defaultMessages, ...field.messages };
    return schema.messages(messages);
};

export const createValidationSchema = (fields) => {
    const schemaObject = {};
    fields.forEach(field => {
        schemaObject[field.name] = createFieldSchema(field);
    });
    return Joi.object(schemaObject);
};

export const validateField = (schema, name, value) => {
    const fieldSchema = schema.extract(name);
    const { error } = fieldSchema.validate(value);
    return error ? { [name]: error.message } : {};
};

export const validateForm = (schema, data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        const errors = {};
        error.details.forEach((detail) => {
            errors[detail.path[0]] = detail.message;
        });
        return { isValid: false, errors };
    }
    return { isValid: true, errors: {} };
};

export default createValidationSchema;