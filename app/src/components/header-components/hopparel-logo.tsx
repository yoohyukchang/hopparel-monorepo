import { Link } from "react-router-dom";

type HopparelLogoProps = {
    isAuthPage: boolean;
}

const HopparelLogo = ({ isAuthPage }: HopparelLogoProps) => {
    let hopparelLogoClass = 'text-xl font-bold';
    if (isAuthPage) {
        hopparelLogoClass = 'text-4xl font-bold mx-auto';
    }

    return (
        <Link to="/">
            <h1 className={hopparelLogoClass}>
                Hopparel
            </h1>
        </ Link>
    );
};

export default HopparelLogo;