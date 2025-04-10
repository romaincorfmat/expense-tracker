import ExpenseStat from "@/components/ExpenseStat";
import React from "react";

const DashBoardPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <h1 className="text-center text-3xl my-4">Your Dashboard</h1>
      <div className="flex flex-col gap-4  p-6 md:w-2xl ">
        <ExpenseStat />
      </div>
    </div>
  );
};

export default DashBoardPage;
