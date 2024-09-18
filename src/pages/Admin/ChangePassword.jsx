import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input
} from "@material-tailwind/react";
import Joi from 'joi';
import { useDispatch } from 'react-redux'
import changepassword from "../../assets/changepassword2.jpg"
import helper from "../../utility/helper.js";
import { useState } from "react";

import APIS from "../../axios/Index.js"

function ChangePassword() {
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const validateForm = () => {
        const validationSchema = Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword:  Joi.string().required(),
        }).required();
        return helper.reactDataValidator(validationSchema, data, setErrors);
    };

    const handleChangePassword = async () => {
        if (!validateForm()) return;
        try {
         await dispatch(APIS.changePassword(data));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        helper.handleChange(event, setData);
    };

    return (
        <Card className="w-full h-auto p-3 overflow-hidden">
            <Typography variant="h4" color="gray" className="mb-2 mt-3 ml-4 md:text-3xl">
                Change Password
            </Typography>
            <div className="w-full flex flex-col md:flex-row">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-full md:w-2/4 shrink-0 rounded-r-none"
                >
                    <img
                        src={changepassword}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="w-full">
                    <div className="mt-8 w-full">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            Current Password
                        </Typography>
                        <div className="w-full max-w-md">
                            <Input
                                type="password"
                                name="oldPassword"
                                placeholder="Enter Current password"
                                className="w-full !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                value={data.oldPassword}
                                onChange={handleChange}
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                                error={errors.oldPassword}
                            />
                            <div>
                                <Typography variant="small" color="red" >
                                    {errors.oldPassword || ""}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 w-full ml-auto">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            New Password
                        </Typography>
                        <div className="w-full max-w-md">
                            <Input
                                type="password"
                                name="newPassword"
                                className="w-full !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                placeholder="Enter New Password"
                                value={data.newPassword}
                                onChange={handleChange}
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                                error={errors.newPassword}
                            />
                             <div>
                            <Typography variant="small" color="red" >
                                {errors.newPassword || ""}
                            </Typography>
                        </div>
                        </div>
                    </div>
                    <div className="mt-5 w-full">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            Confirm Password
                        </Typography>
                        <div className="w-full max-w-md">
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                className="w-full !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                                error={errors.confirmPassword}
                            />
                            <Typography variant="small" color="red" >
                                {errors.confirmPassword || ""}
                            </Typography>
                            <div className="w-full flex justify-center  md:justify-end  mt-10">
                                <Button onClick={handleChangePassword}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </div>
        </Card>
    )
}

export default ChangePassword