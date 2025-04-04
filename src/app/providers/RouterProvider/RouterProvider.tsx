import { ValidateImagesPage } from "@/pages/ValidateImagesPage/ValidateImagesPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ValidateImagesPage />,
  },
]);
