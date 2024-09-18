import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const CardUI = ({ color, count, title }) => {
    return (
        <div className="flex items-center bg-white border rounded-md overflow-hidden shadow-md py-4 cursor-pointer w-full md:w-auto">
            <div className='flex items-center justify-center p-2'>
                <div className={`p-4 ${color} rounded-full`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                    </svg>
                </div>
            </div>
            <div className="px-4 text-gray-500 flex-grow">
                <p className="text-3xl text-gray-900">
                    {count}
                </p>
                <h3 className="text-sm tracking-wider">
                    {title}
                </h3>
            </div>
        </div>
    )
}

const Dashboard = () => {
    const chartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Sales",
                data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 2,
                },
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    const chartConfigs = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Sales",
                data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617"],
            stroke: {
                lineCap: "round",
                curve: "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    };

    const chartConfigss = {
        type: "pie",
        width: 280,
        height: 280,
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: "",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
            legend: {
                show: false,
            },
        },
    };
    return (
        <>
            <div className='w-full h-auto'>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <CardUI color="bg-cyan-300" title="Total Member" count={5241} />
                    <CardUI color="bg-green-300" title="Total Orders" count={5241} />
                    <CardUI color="bg-blue-300" title="Total Transaction" count={5241} />
                    <CardUI color="bg-yellow-300" title="Total Revnue" count={5241} />
                </div>
            </div>
            <div className='flex flex-col md:flex-row mt-8'>
                <Card className='w-full md:w-3/4 mb-4 md:mb-0'>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                            <Square3Stack3DIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Bar Chart
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Visualize your data in a simple way using the
                                @material-tailwind/react chart plugin.
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...chartConfig} />
                    </CardBody>
                </Card>

                <Card className='w-full md:w-1/3 md:ml-5'>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                            <Square3Stack3DIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Pie Chart
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Visualize your data in a simple way using the
                                @material-tailwind/react chart plugin.
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="mt-4 grid place-items-center px-2">
                        <Chart {...chartConfigss} />
                    </CardBody>
                </Card>
            </div>

            <Card className='mt-8'>
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                        <Square3Stack3DIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <Typography variant="h6" color="blue-gray">
                            Line Chart
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="max-w-sm font-normal"
                        >
                            Visualize your data in a simple way using the
                            @material-tailwind/react chart plugin.
                        </Typography>
                    </div>
                </CardHeader>
                <CardBody className="px-2 pb-0">
                    <Chart {...chartConfigs} />
                </CardBody>
            </Card>
        </>
    );
}

export default Dashboard;