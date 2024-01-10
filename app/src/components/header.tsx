import UserAccount from "@/auth/userAccount";
import HopparelLogo from "./header-components/hopparel-logo";
import MyDesignButton from "./header-components/my-designs";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center horizontal-padding-20">
      <HopparelLogo />
      <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
        <Button asChild variant="ghost">
          <MyDesignButton />
        </Button>
      </nav>
      <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="mr-6">
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <UserAccount />
    </div>
  );
};

export default Header;
