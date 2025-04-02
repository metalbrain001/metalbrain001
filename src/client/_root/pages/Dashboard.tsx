// Dashboard component is a protected route that requires authentication to access.
import React from "react";
import DashboardChartCard from "@/client/card/DashBoardChartCard";
import { chartConfigs } from "@/client/constants";
import FireBaseUser from "@/client/firebase/components/FirebaseUser";
import Admin from "@/client/admin/component/Admin";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) {
    return (
      <p className="text-red-500">You must be logged in to view this page.</p>
    );
  }
  const uid = user.uid;
  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </div>
      <div className="text-xl font-bold mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <Admin localId={uid!} />
        </div>
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
          {/*<div className="col-span-1 sm:col-span-2 lg:col-span-3">*/}
          {/*  <FireBaseUser />*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
