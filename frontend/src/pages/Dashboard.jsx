import React, { useEffect } from 'react';
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { balanceAtom } from "../store/atoms/userAtom";
import { tokenAtom } from "../store/atoms/tokenAtom";

export default function Dashboard() {
    const setBalance = useSetRecoilState(balanceAtom);
    const balance = useRecoilValue(balanceAtom);
    const token = useRecoilValue(tokenAtom);
    const storedUsername = localStorage.getItem('username');

    const getBalance = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/account/balance', { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                if (data) {
                    setBalance(data.balance);
                } else {
                    alert('Response fetch successful, data fetch failed: ' + data.message);
                }
            } else {
                alert('Response fetch failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Fetch failed!');
        }
    };

    useEffect(() => {
        getBalance();
    }, []); 

    return (
        <div>
            <Appbar username={storedUsername}></Appbar>
            <Balance balance={balance}></Balance>
            <Users></Users>
        </div>
    );
}
