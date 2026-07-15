export type Platform = "INSTAGRAM" | "YOUTUBE" | "SELF_HOSTED";
export type MediaType = "REEL" | "SHORTS" | "TESTIMONIAL";

export interface FeaturedMedia {
  id: string;
  platform: Platform;
  media_type: MediaType;
  title: string;
  caption: string | null;
  instagram_url: string | null;
  video_url: string | null;
  cloudinary_public_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
