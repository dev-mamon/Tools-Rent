import { Link } from "@inertiajs/react";

const NavItem = ({ href, children, active = false }) => (
    <Link
        href={href}
        className={`text-sm font-semibold transition-all duration-200 ${
            active ? "text-[#10513D]" : "text-gray-400 hover:text-[#10513D]"
        }`}
    >
        {children}
    </Link>
);

export default NavItem;
