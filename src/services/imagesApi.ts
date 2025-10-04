import unsplashClient from "../lib/unsplashClient";
import type { IPopularImage } from "../types/popularImage";

export async function getPopularPhotosPage(page = 1, perPage = 20) {
  const res = await unsplashClient.get<IPopularImage[]>("/photos", {
    params: { order_by: "popular", page, per_page: perPage },
  });
  return res.data; // array of photos
}
