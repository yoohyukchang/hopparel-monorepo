import UserAccount from "@/auth/userAccount";

const Header = () => {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center horizontal-padding-30">
      <div>Hopparel</div>
      <div>My Designs</div>
      <UserAccount />
    </div>
  );
};

export default Header;
