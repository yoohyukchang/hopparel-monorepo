import { Button } from "./ui/button";

const Header = () => {
    return (
        <div className="bg-gray-200 p-4 flex justify-between items-center horizontal-padding-30">
            <div>Hopparel</div>
            <Button size="sm">
                Login
            </Button>
        </div>
    );
};
  
export default Header;
