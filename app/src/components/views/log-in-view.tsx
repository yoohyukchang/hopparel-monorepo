import AuthHeader from "@/components/auth/auth-header";
import Login from "@/components/auth/login";
import HopparelLogo from "../header-components/hopparel-logo";

const LoginView = () => {
    return (
        <>
            <div className="min-h-full h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 adjusted-login-view" >
                <div className="max-w-md w-full space-y-8">
                    <div className="flex justify-center py-5">
                        <HopparelLogo isAuthPage={true} />
                    </div>
                    <AuthHeader 
                        heading="Log in to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                    />
                    <Login />
                </div>
            </div>
        </>
    );
}

export default LoginView;