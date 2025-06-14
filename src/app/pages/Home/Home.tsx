import { useNavigate } from "react-router-dom";
import logo from "../../assets/ScoreLens-Logo.png";
import NInputLabel from "../../components/basicUI/NInputLabel";
import "./home.css";
import { useState } from "react";

export default function Home() {
    const nav = useNavigate();
    const [code, setCode] = useState("");

    const moveUser = () => {
        console.log(code)
        if (!code.trim()) {
            alert("Please enter match code");
            return;
        }
        nav("match", {
            state: {
                codeMatch: code,
            },
        });
    };

    return (
        <div className="h-screen w-screen relative overflow-hidden">
            {/* Logo cố định */}
            <div className="fixed top-4 left-4 z-50">
                <img src={logo} alt="Logo" className="w-40 h-auto" />
            </div>

            {/* Nội dung chính canh giữa */}
            <div className="flex flex-col items-center justify-center h-full gap-5">
                <div className="bebas-neue-regular text-white text-8xl">
                    Score Lens
                </div>
                <div className="w-[33%] relative" >
                    <NInputLabel label="ENTER MATCH CODE"
                        
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    />
                    <button
                        onClick={moveUser}
                        className="text-[30px] rounded-[10px] cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 bg-green-700 text-white px-6 text-sm font-bold mr-2 shadow hover:bg-green-800 transition-all">
                        JOIN
                    </button>
                </div>
            </div>

        </div>
    )
}