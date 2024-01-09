import { designs } from "@/lib/data";

const Designs = () => {
    return (
        <div className="">
            {designs.map((design) => (
                <div key={design.id}>
                    {design.productType}
                </div>
            ))}
        </div>
    );
};

export default Designs;