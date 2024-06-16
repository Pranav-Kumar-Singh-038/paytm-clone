import { useState, useEffect } from "react"
import { Button } from "./Button"
import { tokenAtom } from "../store/atoms/tokenAtom";
import { useRecoilValue } from "recoil";

export default function Users({username}) {
    const token = useRecoilValue(tokenAtom);
    const [users, setUsers] = useState([]);
    const usernameToFind=username;

    useEffect(() => {
        getUsers(setUsers, token, usernameToFind);
    }, []);


    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(function (user) {
                return <User key={user._id} user={user} />
            }
            )}
        </div>
    </>
}

function User({ user }) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} />
        </div>
    </div>
}

async function getUsers(setUsers, token, usernameToFind) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/user/bulk', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (data) {
                const user = data.find(user => user.username == usernameToFind);  
                if (user) {
                    const updatedData = data.filter(user => user.username !== usernameToFind);
                    setUsers(updatedData);
                } else {
                    console.log('User not found');
                }
            } else {
                alert('Data Fetch failed: ' + data.message);
            }
        } else {
            alert('Response Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('User Data Fetch failed!');
    }
}