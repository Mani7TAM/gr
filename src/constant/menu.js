//import {
//    Home,
//} from 'react-feather';
import { FcAreaChart, FcNews, FcDatabase} from "react-icons/fc";

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: FcAreaChart, type: 'link', badgeType: 'primary', active: false, path: '/dashboard',
    },
    {
        title: 'Masters', icon: FcNews, type: 'link', badgeType: 'primary', active: false, path: '/Masters',
    },
    {
        title: 'Collections', icon: FcDatabase, type: 'link', badgeType: 'primary', active: false, path: '/collections',
    },
]

