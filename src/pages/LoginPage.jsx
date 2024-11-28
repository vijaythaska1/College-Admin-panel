import React, { useState, useCallback } from "react";
import image from "../assets/fall-zoom-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
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
import createValidationSchema, { validateField, validateForm } from 'flexible-form-validation';
import APIS from "../axios/Index.js";
// import helper from "../utility/helper.js";npm i flexible-form-validation

function Loginpage() {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [eye, setEye] = useState(0);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const validationSchema = createValidationSchema([
        {
            name: 'email', type: 'email', required: true, messages: {
                'string.empty': 'is not allowed to be empty',
                'string.max': 'Username cannot exceed 20 characters'
            }
        },
        { name: 'password', type: 'string', required: true, min: 6 }
    ]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { isValid, errors } = validateForm(validationSchema, data);
            if (!isValid) {
                setErrors(errors);
                return;
            }
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

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setData(prev => ({ ...prev, [name]: value }));
        const fieldError = validateField(validationSchema, name, value);
        setTimeout(() => { setErrors(prev => ({ ...prev, [name]: fieldError[name] })); }, 2000);
    }, [validationSchema]);

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
                        // error={Boolean(errors.email)}
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
                            // error={Boolean(errors.password)}
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
                        {/* {errors.general && (
                            <Typography variant="small" color="red" className="mt-2 text-center">
                                {errors.general}
                            </Typography>
                        )} */}
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