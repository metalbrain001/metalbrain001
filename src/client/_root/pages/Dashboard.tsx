// Dashboard component is a protected route that requires authentication to access.
import React from "react";
import DashboardChartCard from "@/client/card/DashBoardChartCard";
import { chartConfigs } from "@/client/constants";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {chartConfigs.map((config, index) => (
        <DashboardChartCard
          key={index}
          title={config.title}
          chartType={config.chartType}
          data={config.data}
          options={config.options}
        />
      ))}
    </div>
  );
};

export default Dashboard;
