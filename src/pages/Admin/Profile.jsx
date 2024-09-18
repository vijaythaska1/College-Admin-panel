import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Tooltip,
    CardFooter,
} from "@material-tailwind/react";
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
// import { GET_USER_PROFILE } from "../../Redux/UserAuthSlice";
import APIS from "../../axios/Index"

function Profile() {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    const dispatch = useDispatch();
    const getuser = useSelector((state) => state.getProfile);
  
    useEffect(() => {
      dispatch(APIS.profileGet());
    }, [dispatch]);

    return (
        <div className="container mx-auto">
            <Card className="overflow-hidden">
                <div className={`flex ${isSmallScreen ? "flex-col" : "flex-row"} p-3 shadow-none`}>
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className={`m-0 w-full ${isSmallScreen ? "rounded-none" : "rounded-r-none"}`}
                    >
                        <video className="h-full w-full object-cover" autoPlay muted>
                            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </CardHeader>
                    <CardBody className={`mt-4 ${isSmallScreen ? "" : "mt-0"}`}>
                        <Typography variant="h6" color="gray" className="mb-2 uppercase text-sm">
                            Institute Of Professional Studies (I.P.S.) Gangoh
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
                            Lyft launching cross-platform service this week
                        </Typography>
                        <Typography color="gray" className="mb-4 font-normal text-sm">
                            Like so many organizations these days, Autodesk is a company in
                            transition. It was until recently a traditional boxed software company
                            selling licenses. Yet its own business model disruption is only part
                            of the story
                        </Typography>
                    </CardBody>
                </div>
                <div className={`grid ${isSmallScreen || isTablet ? "grid-cols-1" : "grid-cols-4"} gap-4 mt-8 w-full p-4`}>
                    <Card className={`w-full ${isSmallScreen || isTablet ? "" : "col-span-1"} shadow-none`}>
                        <CardHeader floated={false} className="h-48 w-48 rounded-full mx-auto md:mx-0 md:ml-4 ">
                            <img src={getuser?.getuser?.data?.body?.image} alt="profile-picture" />
                        </CardHeader>

                        <CardBody className="text-center md:text-left md:pl-4 md:ml-12 ">
                            <Typography variant="h4" color="blue-gray" className="mb-2 text-lg">
                                {getuser?.getuser?.data?.body?.firstName} {getuser?.data?.body?.lastname}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium text-sm md:ml-4" textGradient>
                                {getuser?.getuser?.data?.body.department}
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-center md:justify-start gap-4 pt-2">
                            <Tooltip content="Like">
                                <Typography
                                    as="a"
                                    href="#facebook"
                                    variant="lead"
                                    color="blue"
                                    textGradient
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
                                    textGradient
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
                                    textGradient
                                >
                                    <i className="fab fa-instagram" />
                                </Typography>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                    <div className={` mr-20 ${isSmallScreen || isTablet ? "mt-8" : "col-span-3 mt-14"} w-full `}>
                        <div className="flex flex-col md:flex-row mb-4">
                            <Typography variant="h4" color="blue-gray" className="font-normal mb-2 md:mb-0 w-full md:w-1/3 text-lg">
                                Roll No
                            </Typography>
                            <Typography color="gray" className="font-normal w-full md:w-2/3">
                                {getuser?.getuser?.data?.body?.rollNo}
                            </Typography>
                        </div>
                        <div className="flex flex-col md:flex-row mb-4">
                            <Typography variant="h4" color="blue-gray" className="font-normal mb-2 md:mb-0 w-full md:w-1/3 text-lg">
                                Email
                            </Typography>
                            <Typography color="gray" className="font-normal w-full md:w-2/3">
                                {getuser?.getuser?.data?.body?.email}
                            </Typography>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <Typography variant="h4" color="blue-gray" className="font-normal mb-2 md:mb-0 w-full md:w-1/3 text-lg">
                                Phone
                            </Typography>
                            <Typography color="gray" className="font-normal w-full md:w-2/3">
                                +{getuser?.getuser?.data?.body?.countryCode}-{getuser?.getuser?.data?.body?.phoneNumber}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Profile;
