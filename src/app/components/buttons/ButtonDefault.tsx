'use client'
import React from 'react';
import './Button.sass'
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {roboto} from "@/app/fonts";


interface NavbarButtonProps {
    text: string,
    href: string,
}

const ButtonDefault: React.FC<NavbarButtonProps> = ({text, href}) => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <Link style={{width: '100%'}} href={href}>
            <button className={`button ${pathname === href ? 'active' : ''}`}>
                {text}
            </button>
        </Link>
    );
};

export default ButtonDefault;