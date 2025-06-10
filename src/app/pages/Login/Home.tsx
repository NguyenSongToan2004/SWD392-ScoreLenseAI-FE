import { useNavigate } from "react-router-dom";

export default function Home() {
    const nav = useNavigate();
    const moveUser = ()=>{
        localStorage.setItem('auth', 'blackpro');
        nav('/');
    }
    return (
        <>
            <div className="text-red-500">
                Đây là trang Login !!
            </div>
            <button onClick={moveUser} className="btn cursor-pointer">Login -- Home Test Private Route</button>
        </>

    )
}