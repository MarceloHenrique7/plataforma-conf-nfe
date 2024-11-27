import { Link } from "react-router-dom";
import DropDownCreate from "./DropDownCreate";
import DropDownConf from "./DropDownConf";
import DropDownSearch from "./DropDownSearch";
import DropDownStatus from "./DropDownStatus";




const Header = () => {

    return (
        <div className="text-center px-20 py-5 outfit bg-slate-900 text-white flex justify-between items-center">
            <div>
                <Link to={"/"} className="font-bold text-3xl">
                    Conf
                </Link>
            </div>
            <div className="flex gap-12 items-center justify-around">
                <DropDownCreate/>
                <DropDownConf/>
                <DropDownSearch/>
                <DropDownStatus/>
            </div>
        </div>
    )

}



export default Header;