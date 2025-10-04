import unsplashClient from "../lib/unsplashClient";
import type { IPopularImage } from "../types/popularImage";

export async function getPopularPhotosPage(page = 1, perPage = 20) {
  const res = await unsplashClient.get<IPopularImage[]>("/photos", {
    params: { order_by: "popular", page, per_page: perPage },
  });
  return res.data; // array of photos
}

export async function searchPhotosPage(query: string, page = 1, perPage = 20) {
  const res = await unsplashClient.get<{
    results: IPopularImage[];
    total_pages: number;
  }>("/search/photos", { params: { query, page, per_page: perPage } });
  return res.data;
}

export async function getPhotoDetail(id: string) {
  const res = await unsplashClient.get(`/photos/${id}`);
  return res.data;
}

export async function getPhotoStats(id: string) {
  const res = await unsplashClient.get(`/photos/${id}/statistics`);
  return res.data;
}
