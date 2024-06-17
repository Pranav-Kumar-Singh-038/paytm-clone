import { useState, useEffect } from "react"
import { Button } from "./Button"
import { tokenAtom } from "../store/atoms/tokenAtom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { searchAtom, recipientUserAtom } from "../store/atoms/userAtom";
import { useNavigate } from "react-router-dom";

export default function Users({ username }) {
    const token = useRecoilValue(tokenAtom);
    const [users, setUsers] = useState([]);
    const usernameToFind = username;
    const [search, setSearch] = useRecoilState(searchAtom);

    useEffect(() => {
        getUsers(setUsers, token, usernameToFind, search);
    }, [search]);


    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="w-screen my-2 flex">
            <input onChange={(e) => {
                setSearch(e.target.value);
            }} type="text" placeholder="Search users..." className="w-screen px-2 py-1 border rounded border-slate-200"></input>
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
    const [recipientUser, setRecipientUser] = useRecoilState(recipientUserAtom);
    const navigate = useNavigate();

    function handleSendClick() {
        setRecipientUser(user); 
        navigate('/send'); 
    }

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={handleSendClick} />
        </div>
    </div>
}

async function getUsers(setUsers, token, usernameToFind, search) {
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
                const user = data.find(user => user.username === usernameToFind);
                if (user) {
                    const updatedData = data.filter(user => user.username !== usernameToFind);
                    if (search) {
                        const upData = updatedData.find(user => user.firstName.toLowerCase().includes(search.toLowerCase()));
                        if (!upData) {
                            setUsers(updatedData);
                        } else {
                            setUsers([upData]);
                        }
                    }
                    else {
                        setUsers(updatedData)
                    }
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
