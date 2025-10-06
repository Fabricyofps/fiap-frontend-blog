"use client";

import WithRole from "@/app/components/Protected/WithRole";
import EditPostPage from "./EditPostClient";

const EditPostProtected: React.FC = () => {
  return (
    <WithRole requiredRole="professor" redirectTo="/pages/home">
      <EditPostPage />
    </WithRole>
  );
};

export default EditPostProtected;
