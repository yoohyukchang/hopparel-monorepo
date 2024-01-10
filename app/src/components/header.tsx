import UserAccount from "@/auth/userAccount";
import HopparelLogo from "./header-components/hopparel-logo";
import MyDesignButton from "./header-components/my-designs";

const Header = () => {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center horizontal-padding-30">
      <HopparelLogo />
      <MyDesignButton />
      <UserAccount />
    </div>
  );
};

export default Header;
