
const Footer = () => {
    return (
        <div className="text-center p-12 bg-gray-100 dark:bg-gray-950">
            <span className="block text-sm text-center text-gray-500 dark:text-gray-50">
                &copy; {new Date().getFullYear()} Andrés Medina.
            </span>
        </div>
    );
}

export default Footer;
