import { useRecoilState, useRecoilValue } from "recoil";
import { recipientUserAtom, moneyAtom } from "../store/atoms/userAtom";
import { tokenAtom } from "../store/atoms/tokenAtom";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
    const [money, setMoney]= useRecoilState(moneyAtom);
     const recipientUser=useRecoilValue(recipientUserAtom);
     const token = useRecoilValue(tokenAtom);
     const navigate = useNavigate();

     async function initiateTransferHandler()
     {
        try {
            const response = await fetch('http://localhost:3000/api/v1/account/transfer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                    to: recipientUser._id,
                    amount: money
              }),
            });
            const data = await response.json();
      
            if (response.ok) {
              if (data) {
                alert('Transfer successful!');
                navigate('/dashboard'); 
              } else {
                alert('Response Data Error ' + data.message);
              }
            } else {
              
                console.log(data);
                console.log(response);
              alert('Response Error ' + data.message);
            }
          } catch (error) {
            console.error('Error:', error);
            alert('Transfer Failed');
          }
     }

    return <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
        <div
            className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
        >
            <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div className="p-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
                </div>
                <h3 className="text-2xl font-semibold">{recipientUser.firstName}</h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="amount"
                >
                    Amount (in Rs)
                </label>
                <input
                    type="number"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={(e) => {
                        setMoney(e.target.value);}}
                />
                </div>
                <button onClick={initiateTransferHandler} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                    Initiate Transfer
                </button>
            </div>
            </div>
    </div>
  </div>
</div>
}