export default function Balance({ balance }) {
    return (
    <div className="flex">
        <div className="ml-4 font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
    )
}