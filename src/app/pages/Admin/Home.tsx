import { useNavigate } from "react-router-dom"

export default function Admin() {
    const nav = useNavigate();
    const returnUser = () => {
        localStorage.removeItem('auth');
        nav('/login');
    }
    return (
        <>
            <div className="text-red-500">
                Đây là trang Admin !!
            </div>
            <button onClick={returnUser} className="cursor-pointer border-amber-300">Log out - xóa localStorage</button>
        </>
    )
}