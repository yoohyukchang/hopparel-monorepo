import { Design as DesignType } from "@/lib/types";

type DesignProps = {
    design: DesignType;
};

const Design = (props: DesignProps) => {
    const { design } = props;
    return (
        <div className="">
            {design.productType}
        </div>
    );
}

export default Design;