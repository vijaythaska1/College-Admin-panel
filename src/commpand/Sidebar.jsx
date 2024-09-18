import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import logo from "../assets/sidebarimage.png"
import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux'

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const sidebar = useSelector(store => store?.sidebar?.value);
  const sidebarvalue = useSelector(state => state.sidebar.value);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      <div className={`h-full sm:block hidden`}>
        <Card className={`h-full ${sidebarvalue === 0 ? `w-full` : `hidden`} max-w-[20rem] p-4 shadow-xl transition-all duration-300 ease-in-out`}>
          <div className={`flex ${sidebar === 0 ? "justify-end" : "justify-center mb-3"} relative top-1`}>
          </div>
          <div className="mb-2 flex justify-center">
            <Typography variant="h5" color="blue-gray">
              <img
                className="object-cover object-center"
                src={logo}
                alt="nature image"
              />
            </Typography>
          </div>

          <List className="overflow-auto">
            <Accordion className={`${sidebar === 0 ? `w-full` : `w-10`} justify-center`}>
              <Link to={"/Dashboard"}>
                <ListItem >
                  <ListItemPrefix>
                    <InboxIcon className="h-5" />
                  </ListItemPrefix>
                  {`${sidebar === 0 ? "Dashboard" : ""}`}
                </ListItem>
              </Link>

              <Link to={"/Studentlisting"}>
                <ListItem className={`${sidebar === 0 ? "Inbox" : ""}`}>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5" />
                  </ListItemPrefix>
                  {`${sidebar === 0 ? "Student" : ""}`}
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5" />
                </ListItemPrefix>
                {`${sidebar === 0 ? "Satting" : ""}`}
              </ListItem>

              <ListItem>
                <ListItemPrefix>
                  <PowerIcon className="h-5" />
                </ListItemPrefix>
                {`${sidebar === 0 ? "Log Out" : ""}`}
              </ListItem>
            </Accordion>

            <Accordion
              open={open === 1}
              className={`${sidebar === 0
                ? `w-full`
                : `w-10`} justify-center`
              }
              icon={sidebar === 0
                ? <ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4`} />
                : ""}
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5" />
                  </ListItemPrefix>

                  <Typography color="blue-gray" className="mr-auto font-normal">
                    {`${sidebar === 0 ? "CMS" : ""}`}
                  </Typography>

                </AccordionHeader>
              </ListItem>


              <AccordionBody className={`py-1 ${sidebar === 0 ? `w-full` : `w-10`} justify-center`}>
                <List className="p-0">

                  <Link to={"/TermsAndConditions"}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Terms & Conditions
                    </ListItem>
                  </Link>

                  <Link to={"/PrivacyPolicy"}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Privacy Policy
                    </ListItem>
                  </Link>

                  <Link  to={"/AboutsUS"}>
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      About us
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      </div>
    </>
  );
}