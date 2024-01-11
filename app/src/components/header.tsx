
import HopparelLogo from "./header-components/hopparel-logo";
import { Menu } from "lucide-react";
import ProfileButton from "./header-components/profile-button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import Container from "./ui/container";
import { useStore } from "@/lib/store";
import LoginButton from "./header-components/login-button";

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
                <nav className="flex flex-col gap-4">
                  <Link to="/my-designs" className='block px-2 py-1 text-lg'>
                    My Designs
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <HopparelLogo isAuthPage={false} />
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            <Link to="/my-designs" className='text-sm font-medium transition-colors'>
              My Designs
            </Link>
          </nav>
          {user ? <ProfileButton /> : <LoginButton />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
