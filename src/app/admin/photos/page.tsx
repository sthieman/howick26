import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/data/gallery";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PhotosManager } from "@/components/admin/PhotosManager";

export const metadata: Metadata = { title: "Photos" };

export default async function AdminPhotosPage() {
  const photos = await getGalleryPhotos();
  return (
    <>
      <AdminHeader title="Photos" />
      <div style={{ padding: 32, flex: 1 }}>
        <PhotosManager photos={photos} />
      </div>
    </>
  );
}
