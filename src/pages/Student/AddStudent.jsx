'use strict';
import {
    Card,
    Input,
    Typography,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useCountries } from "use-react-countries";

function AddStudent() {
    const { countries } = useCountries();
    const [country, setCountry] = useState(0);
    const { name, flags, countryCallingCode } = countries[country];
    const [data, setData] = useState({
        firstName: "",
        lastName: ""
    })
    return (
        <Card className="min-h-min p-3 text-balance">
            <Typography variant="h4" color="gray" className="mb-2 mt-3 ml-4">
                Add Student
            </Typography>
            <div className="flex items-center mt-5 ml-9 space-x-6">
                <div className="shrink-0">
                    <img
                        className="h-16 w-16 object-cover rounded-full"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                        alt="Current profile photo"
                    />
                </div>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                        type="file"
                        className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100"
                    />
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ml-9 mr-9 mt-10">
                <Input variant="outlined" label="First Name" placeholder="Enter First Name" />
                <Input variant="outlined" label="Last Name" placeholder="Enter Last Name" />
                <Input variant="outlined" label="Email" placeholder="Enter Email " />
                <Input variant="outlined" label="Password" placeholder="Enter Password" />
                <Input variant="outlined" label="Regestration No" placeholder="Enter Regestration Number" />
                <div className="relative flex ">
                    <Menu placement="bottom-start">
                        <MenuHandler>
                            <Button
                                ripple={false}
                                variant="text"
                                color="blue-gray"
                                className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                            >
                                <img
                                    src={flags.svg}
                                    alt={name}
                                    className="h-4 w-4 rounded-full object-cover"
                                />
                                {countryCallingCode}
                            </Button>
                        </MenuHandler>
                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                            {countries.map(({ name, flags, countryCallingCode }, index) => {
                                return (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        className="flex items-center gap-2"
                                        onClick={() => setCountry(index)}
                                    >
                                        <img
                                            src={flags.svg}
                                            alt={name}
                                            className="h-5 w-5 rounded-full object-cover"
                                        />
                                        {name} <span className="ml-auto">{countryCallingCode}</span>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                    <Input
                        type="tel"
                        placeholder="Enter Number"
                        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                </div>
            </div>
            <div className="flex items-center justify-center mt-10 mx-9">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Upload Document </span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>

            <div className="flex justify-end mt-10 mr-9">
                <Button loading={true}>Submit</Button>
            </div>
        </Card>
    )
}

export default AddStudent;
