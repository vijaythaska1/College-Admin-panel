import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Tooltip,
    CardFooter,
} from "@material-tailwind/react";

function StudentView() {
    return (
        <>
            <Card className="p-6 ">
                <Typography variant="h4" color="gray" className="mb-4">
                    Student Details
                </Typography>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="col-span-1 shadow-none flex flex-col items-center">
                        <CardHeader floated={false} className="h-48 w-48 rounded-full">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" className="h-full w-full object-cover rounded-full" />
                        </CardHeader>
                        <CardBody className="text-center ">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Vijay Sharma
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                BCA III Sem
                            </Typography>
                        </CardBody>

                        <CardFooter className="flex justify-center gap-4">
                            <Tooltip content="Like">
                                <Typography
                                    as="a"
                                    href="#facebook"
                                    variant="lead"
                                    color="blue"
                                >
                                    <i className="fab fa-facebook" />
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#twitter"
                                    variant="lead"
                                    color="light-blue"
                                >
                                    <i className="fab fa-twitter" />
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#instagram"
                                    variant="lead"
                                    color="purple"
                                >
                                    <i className="fab fa-instagram" />
                                </Typography>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                    <div className="col-span-1 lg:col-span-2 lg:mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Typography variant="h4" color="blue-gray" className="font-normal mb-2 text-lg">
                                    Name
                                </Typography>
                                <Typography color="gray" className="font-normal">
                                    Vijay Sharma
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h4" color="blue-gray" className="font-normal mb-2 text-lg">
                                    Email
                                </Typography>
                                <Typography color="gray" className="font-normal">
                                    VijaySharma@gmail.com
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h4" color="blue-gray" className="font-normal mb-2 text-lg">
                                    Phone
                                </Typography>
                                <Typography color="gray" className="font-normal">
                                    +91-9675570221
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default StudentView;
