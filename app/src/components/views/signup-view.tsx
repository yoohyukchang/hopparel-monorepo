import AuthHeader from "@/components/auth/auth-header";
import SignUp from "@/components/auth/signup";
import HopparelLogo from "../header-components/hopparel-logo";

const SignupView = () => {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 adjusted-login-view">
            <div className="max-w-md w-full space-y-8">
                <div className="flex justify-center py-5">
                    <HopparelLogo isAuthPage={true} />
                </div>
                <AuthHeader
                    heading="Sign up to create an account"
                    paragraph="Already have an account? "
                    linkName="Login"
                    linkUrl="/login-page"
                />
                <SignUp />
            </div>
        </div>
    );
};

export default SignupView;