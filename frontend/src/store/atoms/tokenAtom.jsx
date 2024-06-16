import {atom} from 'recoil';

export const tokenAtom=atom({
    key:"tokenAtom",
    default:localStorage.getItem('token') || null
 })