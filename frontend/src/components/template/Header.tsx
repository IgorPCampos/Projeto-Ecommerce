import Avatar from "./Avatar";
import Search from "./Search";
import React from "react";
import Title from "./Title";

interface HeaderProps {
    title: string;
    subTitle: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <Title title={props.title} subTitle={props.subTitle} />
            <div className="flex items-center justify-center flex-grow"> 
                <Search />
            </div>
            <div className="flex justify-end items-center">
                <Avatar />
            </div>
        </div>
    );
}
