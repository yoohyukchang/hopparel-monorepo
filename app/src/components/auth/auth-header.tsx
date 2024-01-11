import { Link } from "react-router-dom";

type AuthHeaderProps = {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl?: string;
};

const AuthHeader = ({
    heading,
    paragraph,
    linkName,
    linkUrl="#",
}: AuthHeaderProps) => {
    return (
        <div className="mb-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-customBlue hover:text-customBlue hover:text-opacity-75">
                {linkName}
            </Link>
            </p>
        </div>
    );
}

export default AuthHeader;