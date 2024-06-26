import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { tokenAtom } from '../store/atoms/tokenAtom';

export default function Appbar({username}) {
    const setToken = useSetRecoilState(tokenAtom);
    const token = useRecoilValue(tokenAtom);

    const handleLogOut = async () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };


    // useEffect(() => {
    //     if (!token) {
    //         console.log('Token in Recoil state (tokenAtom) is cleared.');
    //     } else {
    //         console.log('Token in Recoil state (tokenAtom) is still present:', token);
    //     }
    //     const localStorageToken = localStorage.getItem('token');
    //     if (!localStorageToken) {
    //         console.log('Token in localStorage is cleared.');
    //     } else {
    //         console.log('Token in localStorage is still present:', localStorageToken);
    //     }
    // }, [token]);


return <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
    </div>
    <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
            Hello
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
             {username ? username[0].toUpperCase(): 'N'}
            </div>
        </div>
        <button onClick={handleLogOut} type="button" className="pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>
        </button>
    </div>
</div>
}