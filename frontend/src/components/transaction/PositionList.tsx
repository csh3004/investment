import { useEffect, useState } from "react";

type Position = {
    entryPrice: number;
    id: number;
    positionType: string;
    quantityPercent: number;
    userID: string;
};

type PositionListProps = {
  refreshKey: number;
};

const PositionList = ({ refreshKey }: PositionListProps) => {
  const [positionList, setPositionList] = useState<Position[]>([]);

  const fetchPositionList = async () => {
    try {
      const response = await fetch("http://localhost:8080/position/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (!response.ok) {
        throw new Error("포지션 조회 실패");
      }

      const data = await response.json();
      setPositionList(data);
    } catch (error) {
      console.error("포지션 리스트를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const closePosition = async (positionId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/position/close/${positionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      if (!response.ok) {
        throw new Error("포지션 닫기 실패");
      }

      fetchPositionList();
    } catch (error) {
      console.error("포지션을 닫는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    fetchPositionList();
  }, [refreshKey]);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-5 w-full col-span-3">
      <h3 className="font-bold text-lg text-white">포지션 리스트</h3>

      {positionList.map((position) => (
        
        <div
        key={position.id}
        className="text-white"
        onClick={() => console.log(position.id)}
        >
        {position.entryPrice}
        <br />
        {position.positionType}
        <br />
        {position.quantityPercent}
        <br />
        <button
          onClick={(e) => {
            e.stopPropagation();
            closePosition(position.id);
          }}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          포지션 닫기
        </button>
        </div>
      ))}
    </div>
  );
};

export default PositionList;