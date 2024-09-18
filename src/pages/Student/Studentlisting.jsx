import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import APIS from '../../axios/Index';
const TABLE_HEAD = ["Sr.No", "Member", "Phone Number", "Department", "Status", "Admission Date", "Actions"];

function Studentlisting() {
    const [data, setData] = useState("");
    const [skip, setskip] = useState(1)
    const dispatch = useDispatch()
    const getUser = useSelector((state) => state.getUser);



    const itemsPerPage = 10
    useEffect(() => {
        const debounceId = setTimeout(() => {
            dispatch(APIS.getUser({ role: 1, search: data, skips: skip }));
        }, 700);
        return () => {
            clearTimeout(debounceId);
        };
    }, [dispatch, data, skip]);
    const navegate = useNavigate();
    const handleChange = (event) => {
        setData(event.target.value);
    };

    return (
        <Card className="w-full overflow-hidden">
            <CardBody className="px-0 pt-2">
                <CardHeader floated={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Members list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="">
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row mb-4">
                            <Button className="flex items-center gap-3 ml-32" onClick={() => navegate("/AddStudent")} size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Student
                            </Button>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    value={data}
                                    onChange={handleChange}
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                </CardHeader>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {getUser?.getUser?.data?.body?.data.map(
                                (data, index) => {
                                    const isLast = index === getUser?.getUser?.data?.body?.data.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={data?.firstName}>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {(skip - 1) * itemsPerPage + index + 1}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={data?.image} alt={data?.name} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {data?.firstName} {data?.lastName}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {data?.email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        +{data.countryCode}-{data?.phoneNumber}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {data?.department}
                                                    </Typography>
                                                </div>
                                            </td>


                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={data.status === 1 ? "online" : "offline"}
                                                        color={data.status === 1 ? "green" : "blue-gray"}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {data?.joiningDate}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Edit User">
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="View Student">
                                                    <IconButton onClick={() => navegate("/StudentView")} variant="text">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                                                        </svg>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Delete Student">
                                                    <IconButton onClick={() => navegate("/StudentView")} variant="text">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                        </svg>
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </div>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {`Page ${skip} of ${(getUser?.getUser?.data?.body.conut / 10).toFixed(0)}`}
                </Typography>
                <div className="flex gap-2">
                    <Button disabled={skip == 1} variant="outlined" onClick={() => setskip(skip - 1)} size="sm" >
                        Previous
                    </Button>
                    <Button variant="outlined" disabled={skip == (getUser?.getUser?.data?.body.conut / 10).toFixed(0)} onClick={() => setskip(skip + 1)} size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
export default Studentlisting