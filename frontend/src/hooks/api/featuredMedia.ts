import { useQuery } from "@tanstack/react-query";
import { getFeaturedMedia } from "@/services/featuredMedia.service";

export const useFeaturedMedia = () => {
  return useQuery({
    queryKey: ["featuredMedia"],
    queryFn: () => getFeaturedMedia(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
