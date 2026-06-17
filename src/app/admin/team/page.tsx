import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/data/team";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TeamManager } from "@/components/admin/TeamManager";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage() {
  const team = await getTeamMembers();
  return (
    <>
      <AdminHeader title="Team" />
      <div style={{ padding: 32, flex: 1 }}>
        <TeamManager team={team} />
      </div>
    </>
  );
}
