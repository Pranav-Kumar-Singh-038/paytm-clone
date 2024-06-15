import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
    return (
        <div>
            <Appbar></Appbar>
            <Balance balance={10000}></Balance>
            <Users></Users>
        </div>
    )
}