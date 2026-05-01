import { useEffect, useState } from "react"

const PositionList = () => {
    const [positionList, setPositionList] = useState("");
    useEffect(() => {
        setPositionList(localStorage.getItem("positionList") || "");
        // console.log("positionList");
        // console.log(positionList);
    }, [positionList]);


    return (
        <div className="bg-gray-800 rounded-2xl p-6 space-y-5 w-full col-span-3">
            <h3 className="font-bold text-lg text-white">포지션 리스트</h3>
        </div>
    )
}
export default PositionList