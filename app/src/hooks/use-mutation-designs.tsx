import { useToast } from "@/components/ui/use-toast";
import { createDesign, deleteDesign, editDesign } from "@/lib/api";
import { useStore } from "@/lib/store";

function useMutationDesigns() {
    const { toast } = useToast();
    const removeDesign = useStore((state) => state.removeDesign);
    const addDesign = useStore((state) => state.addDesign);
    const updateDesign = useStore((state) => state.updateDesign);

    const removeDesignById = async (designId: string) => {
        try {
            await deleteDesign(designId);
            removeDesign(designId);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to delete the design",
                description:
                (error as Error).message ||
                "There was an error deleting the design. Please try again later.",
            });
        }
    };

    const makeNewDesign = async (productType: string, image: string) => {
        try {
            const newDesign = await createDesign(productType, image);
            addDesign(newDesign);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to create the design",
                description:
                    (error as Error).message ||
                    "There was an error creating the design. Please try again later.",
            });
        }
    };

    const editDesignById = async (designId: string, newProductType: string, newImage: string) => {
        await editDesign(designId, newProductType, newImage);
        updateDesign(designId, newProductType, newImage);
    };

    return {
        removeDesignById,
        makeNewDesign,
        editDesignById,
    };
}

export default useMutationDesigns;