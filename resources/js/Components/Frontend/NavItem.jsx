import { Link } from "@inertiajs/react";

const NavItem = ({ href, children, active = false }) => (
    <Link
        href={href}
        className={`text-sm font-semibold transition-all duration-200 ${
            active
                ? "text-[#10513D] dark:text-emerald-400"
                : "text-gray-400 hover:text-[#10513D] dark:hover:text-emerald-400"
        }`}
    >
        {children}
    </Link>
);

export default NavItem;
