import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const AddTansaction = () => {
  return (
    <Button className="max-md:w-full">
      Add New Tansaction <Plus className="font-bold" />
    </Button>
  );
};

export default AddTansaction;
