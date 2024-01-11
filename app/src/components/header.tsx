
import HopparelLogo from "./header-components/hopparel-logo";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import Container from "./ui/container";
import { useStore } from "@/lib/store";
import { LogoutDialog } from "./auth/logout-dialog";
import { LoginDialog } from "./auth/login-dialog";
import { RegisterDialog } from "./auth/register-dialog";
import { Button } from "./ui/button";

const Header = () => {
  const user = useStore((state) => state.user);

  return (
    <header className="bg-gray-200 sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div>
                  <span className="padding-right">
                    {user ? <LogoutDialog /> : <LoginDialog />}
                  </span>
                  {!user && <RegisterDialog />}
                </div>
                <nav className="flex flex-col gap-4">
                  <Link to="/my-designs" className='block px-2 py-7 text-sm'>
                    <span className="font-semibold">
                      My Designs
                    </span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <HopparelLogo />
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            <Link to="/my-designs" className='text-sm font-medium transition-colors'>
              <span className="font-semibold">
                My Designs
              </span>
            </Link>
          </nav>
          <div>
            <span className="padding-right">
              {user ? <LogoutDialog /> : <LoginDialog />}
            </span>
              {!user && <RegisterDialog />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
