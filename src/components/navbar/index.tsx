import { NavLink } from "react-router-dom";

const NavBar = () => {
    return(
        <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <NavLink to="/" className="text-xl font-semibold">Elden Blogs</NavLink>
            <ul className="flex space-x-4">
                <NavLink to='/login' className="hover:text-gray-300">Log in</NavLink>
                <NavLink to='/register' className="hover:text-gray-300">Join</NavLink>
            </ul>
        </div>
    </nav>
    
    );
}

export default NavBar;