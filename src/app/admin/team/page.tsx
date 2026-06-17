import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data/team";
import { getSiteSettings } from "@/lib/data/settings";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TeamManager } from "@/components/admin/TeamManager";
import { TeamPhotoUploader } from "@/components/admin/TeamPhotoUploader";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage() {
  const [team, settings] = await Promise.all([getTeamMembers(), getSiteSettings()]);
  return (
    <>
      <AdminHeader title="Team" />
      <div style={{ padding: 32, flex: 1 }}>
        <TeamPhotoUploader initial={settings?.team_photo ?? null} />
        <TeamManager team={team} />
      </div>
    </>
  );
}
