import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
      COPYRIGHT © 2024 <Link to={"/"}>(I.P.S.)</Link >  Gangoh, All rights Reserved
      </Typography>
    </footer>
  );
}