import Title from "@/components/atoms/Title";
import { useEffect, useState } from "react";
import { getAllTodos } from "../../utils/supabaseFunction";
import Sideber from "@/components/organisms/Sideber";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/router";
import Header from "@/components/organisms/Header";
import Button from "@/components/atoms/Button";


export default function Id() {

    return (
        <div className="flex">
        <Sideber />
        <div className="flex flex-col w-full">
            <Header />
            <section>
                <div className="flex justify-end mt-10 mr-24">
                    <Button title={"新規作成"} size={"md"} color={"orange"}></Button>
                </div>
                <div className="flex flex-col py-4 px-24">
                    <div className="border-t-2 border-x-2 rounded-lg">
                        <div className=" border-b-2 py-2 px-8 flex flex-col gap-y-4 text-slate-600">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div>
                                        <h2 className="text-xs font-bold"><span className="text-emerald-400">■</span> タイトル</h2>
                                        <p className="text-sm">ビジネスと法、課題の件</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-8">
                                    <div>
                                        <p className="text-sm">2024/07/01</p>
                                    </div>
                                    <Button title={"返済完了"} size={"xs"} color={"emerald"}></Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold">返済物</h3>
                                <p className="text-sm">飲み奢り</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold">説明</h3>
                                <p className="text-sm">ビジネスと法の第４回課題の回答を教えてもらった</p>
                            </div>
                        </div>
                        <div className=" border-b-2 py-2 px-8 flex flex-col gap-y-4 text-slate-600">
                            <div>
                                <h2 className="text-xs font-bold"><span className="text-emerald-400">■</span> タイトル</h2>
                                <p className="text-sm">ビジネスと法、課題の件</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold">返済物</h3>
                                <p className="text-sm">ご飯奢り</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold">説明</h3>
                                <p className="text-sm">テキストテキストテキストテキストテキストテキストテキストテキスト</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
}