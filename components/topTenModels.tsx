import { Card, CardContent } from "./ui/card";
import { topTenModels } from "@/lib/data";
import Image from "next/image";
import ModelCard from "./model-card";

const TopTenModels = () => {
  return (
    <div className="h-fit w-full p-4 flex flex-col gap-2">
      <h3 className="font-bold uppercase">Top Model Escorts</h3>

      <div className="grid grid-cols-4 gap-4">
        {topTenModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
        {topTenModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default TopTenModels;
