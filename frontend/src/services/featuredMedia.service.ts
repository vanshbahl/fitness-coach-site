import { apiClient } from '../api/client';
import { FeaturedMedia } from '../types/featuredMedia';
import { isDemoMode } from '../utils/demo';

const generateDemoMedia = (): FeaturedMedia[] => [
  {
    id: "demo-1",
    platform: "INSTAGRAM",
    media_type: "REEL",
    title: "90 Degree Hold",
    caption: "Master the technique step by step.",
    instagram_url: "https://www.instagram.com/reel/DOBEAGaEiWN/",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    cloudinary_public_id: "demo-90-hold",
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-2",
    platform: "INSTAGRAM",
    media_type: "REEL",
    title: "Handstand Mastery",
    caption: "Build a solid foundation.",
    instagram_url: "https://www.instagram.com/reel/DJMVhcwCJTw/",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    cloudinary_public_id: "demo-handstand",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-3",
    platform: "INSTAGRAM",
    media_type: "REEL",
    title: "Compression Strength",
    caption: "Unlocking advanced movements.",
    instagram_url: "https://www.instagram.com/reel/DZ_oo2avEVn/",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    cloudinary_public_id: "demo-compression-strength",
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const getFeaturedMedia = async (): Promise<FeaturedMedia[]> => {
  if (isDemoMode) {
    return new Promise(resolve => setTimeout(() => {
      resolve(generateDemoMedia());
    }, 400));
  }

  const response = await apiClient.get<FeaturedMedia[]>("/public/featured-media");
  return response.data;
};
