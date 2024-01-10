import { useToast } from "@/components/ui/use-toast";
import { fetchUserDesigns } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryDesigns() {
  const { toast } = useToast();
  const designs = useStore((state) => state.designs);
  const setDesigns = useStore((state) => state.setDesigns);

  const loadDesigns = async () => {
    try {
      const fetchedDesigns = await fetchUserDesigns();
      setDesigns(fetchedDesigns);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch designs",
        description:
          (error as Error).message ||
          "There was an error loading the designs. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadDesigns();
  }, []);

  return {
    designs,
  };
}

export default useQueryDesigns;
