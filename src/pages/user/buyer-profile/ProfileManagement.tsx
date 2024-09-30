// ProfileManagement.js
import { PersonalSection } from "@/components/profile-personal-section";

const ProfileManagement = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Profile Management</h2>
    <PersonalSection userData />
    <div className="mt-4"></div>
  </div>
);

export default ProfileManagement;
