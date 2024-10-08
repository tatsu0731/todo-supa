import Link from "next/link";
import Title from "../atoms/Title";
import { getUserId } from "../../../utils/supabaseFunction";

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/router";
import Thanks from "../atoms/Thanks";
import Copyright from "../atoms/Copyright";
import Image from "next/image";

export default function Sideber() {
    const [targets, setTargets] = useState<{
        id: number;
        title: string;
        created_at: string;
        status: boolean;
        user_id: string;
        Thanks: [];
    }[]>([]);

    const [targetUser, setTargetUser] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTargetsByUserId = async () => {
            const user_id = await getUserId();
            setUserId(user_id)
            const { data, error } = await supabase.from('Targets').select(`*, Thanks(target_id, done)`).eq('user_id', user_id).eq('Thanks.done', false);
            if (!error) {
                setTargets(data);
            }
        };
        fetchTargetsByUserId();
    }, [targets]);

    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { data, error } = await supabase
        .from('Targets')
        .insert([
        { title: targetUser, status: false, user_id: userId },
        ])
        .select()
        if (!error) {
            setTargets((prevTargets) => [...prevTargets, ...data])
            setTargetUser("")
            return
        }
        setError(true)
    }

    return (
    <div className=" w-60 h-screen px-4 bg-gradient-to-b from-emerald-400 from-70% to-sky-400 text-white flex flex-col justify-between items-center border-r-2 border-slate-300">
        <div>
            <Link href="/">
            <Title />
            </Link>
            <div className="">
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債権者一覧</h2>
                {targets.map((target) => (
                    <Thanks target={target} key={target.id} setTargets={setTargets}/>
                ))}
                <h2 className="text-xs font-bold text-slate-200 mt-4 mb-2">■ 債権者新規作成</h2>
                <form>
                    <input type="text" value={targetUser} placeholder="債権者名" className="text-black px-1 rounded-md" onChange={(e) => setTargetUser(e.target.value)}/>
                    {error && <p className="text-red-400 text-sm">作成に失敗しました</p>}
                    <button className=" text-emerald-400 py-1 px-4 bg-white rounded-md mt-2 shadow-sm" onClick={handleSubmit}>作成</button>
                </form>
            </div>
        </div>
        <div className="mb-4 flex flex-col  gap-4">
            <button className="text-sm flex items-center gap-1" onClick={() => signOut()}>
                <Image src={"log-out.svg"} width={16} height={16} alt=""/>
                <p>ログアウト</p>
            </button>
            <Copyright />
        </div>
    </div>
    )
}