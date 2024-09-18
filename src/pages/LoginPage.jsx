import React, { useState, useCallback } from "react";
import image from "../assets/fall-zoom-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import Joi from 'joi';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Typography,
    Button,
} from "@material-tailwind/react";
import APIS from "../axios/Index.js";
// import helper from "../utility/helper.js";

function Loginpage() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [eye, setEye] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = {
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Email must be a valid email',
            'string.empty': 'Email is not allowed to be empty',
            'any.required': 'Email is required and cannot be empty'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Password is not allowed to be empty',
            'any.required': 'Password is required'
        }),
    };

    const validateField = useCallback((name, value) => {
        try {
            Joi.attempt(value, validationSchema[name]);
            setErrors(prev => ({ ...prev, [name]: undefined }));
        } catch (error) {
            setErrors(prev => ({ ...prev, [name]: error.message }));
        }
    }, [validationSchema]);

    const validateForm = useCallback(() => {
        const schema = Joi.object(validationSchema);
        try {
            schema.validateAsync(data, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error) {
            const newErrors = {};
            error.details.forEach((detail) => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
            return false;
        }
    }, [data,validationSchema]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;
        try {
            const res = await dispatch(APIS.authLogin(data));
            if (res.payload.data.success === true) {
                navigate("/Dashboard");
                localStorage.setItem('userProfile', JSON.stringify(res.payload.data.body));
            }
        } catch (error) {
            console.error(error);
            setErrors(prev => ({ ...prev, general: "Login failed. Please try again." }));
        }
    };

    const handleEye = () => {
        setEye(prev => prev === 1 ? 0 : 1);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
        setTimeout(() => {
            validateField(name, value);
        }, 1000);
    };

    return (
        <section
            className="w-full h-screen flex items-center justify-center"
            style={{ backgroundImage: `url("${image}")` }}
        >
            <Card className="w-96 display: flex justify-self-center">
                <form onSubmit={handleLogin}>
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            size="lg"
                            autoComplete="username"
                            value={data.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                        />
                        {errors.email && (
                            <Typography variant="small" color="red">
                                {errors.email}
                            </Typography>
                        )}
                        <div className="relative flex">
                            <Input
                                label="Password"
                                name="password"
                                size="lg"
                                type={eye === 0 ? "password" : "text"}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                            />
                            <span className="material-symbols-outlined flex absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleEye}>
                                {eye === 1 ? "visibility" : "visibility_off"}
                            </span>
                        </div>
                        {errors.password && (
                            <Typography variant="small" color="red">
                                {errors.password}
                            </Typography>
                        )}
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button type="submit" variant="gradient" fullWidth>
                            Sign In
                        </Button>
                        {errors.general && (
                            <Typography variant="small" color="red" className="mt-2 text-center">
                                {errors.general}
                            </Typography>
                        )}
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="ml-1 font-bold text-blue-500"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}

export default Loginpage;