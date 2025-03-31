import React, { Suspense } from "react";
import "./styles/index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./providers";

export const App: React.FC = () => {
  return (
    <div className={`app`}>
      <Suspense fallback="">
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
};
