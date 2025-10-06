"use client";

import WithRole from "@/app/components/Protected/WithRole";
import CreatePostPage from "./CreatePostClient";

const EditPostProtected: React.FC = () => {
  return (
    <WithRole requiredRole="professor" redirectTo="/pages/home">
      <CreatePostPage />
    </WithRole>
  );
};

export default EditPostProtected;
