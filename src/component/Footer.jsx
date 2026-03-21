import React from "react";
import {
  HomeIcon,
  MessageIcon,
  ProfileIcon,
  SavePostIcon,
  SearchIcon,
} from "../assets/icons";

const navigations = [
  <HomeIcon />,
  <SearchIcon />,
  <MessageIcon />,
  <SavePostIcon />,
  <ProfileIcon />,
];

export const Footer = () => {
  return (
    <div className="grid grid-cols-5 align-items-center">
      {navigations.map((navigation, index) => (
        <div key={index} className="flex items-center justify-center">
          {navigation}
        </div>
      ))}
    </div>
  );
};
