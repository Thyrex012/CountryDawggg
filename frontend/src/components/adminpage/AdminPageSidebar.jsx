import countryDawgggLogo from '../../assets/CountryDawggg-logo-white-fill.svg';
import shirtSVG from "../../assets/shirt-solid-full.svg"
import OrderSVG from "../../assets/cart-shopping-solid-full.svg"
import UserSVG from "../../assets/user-solid-full.svg"
import InventoryAlertSVG from "../../assets/bell-solid-full.svg"
import ChartSVG from "../../assets/chart-line-solid-full.svg"
import SidebarItem from "./SidebarItem.jsx";
import {useNavigate} from "react-router-dom";

function AdminPageSidebar(){

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include", // required so the cookie is sent + the clearing cookie is accepted
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            navigate("/loginandsignup");
        }
    };

    return <nav className="flex flex-col h-screen w-56 bg-red-600">
        <img className="" src={countryDawgggLogo}></img>
        <div className="flex flex-col gap-2 justify-items-center mt-3 flex-1">
            <SidebarItem icon={shirtSVG} text={"products"}></SidebarItem>
            <SidebarItem icon={OrderSVG} text={"Orders"}></SidebarItem>
            <SidebarItem icon={UserSVG} text={"Customers"}></SidebarItem>
            <SidebarItem icon={InventoryAlertSVG} text={"Inventory Alerts"}></SidebarItem>
            <SidebarItem icon={ChartSVG} text={"Analytics"}></SidebarItem>
        </div>
        <button className="text-white h-10 bg-pink-400 rounded-full mb-4 mx-4" onClick={handleLogout}>logout</button>
    </nav>
}
export default AdminPageSidebar;