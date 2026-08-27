"use client"
import { useParams } from "next/navigation"

export default function Zap() {
    const params = useParams();

    return (
        <div className="">
            { params.zapId }
        </div>
    )
}