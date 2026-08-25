function SidebarItem({ icon, text }) {
    return (
        <div className="flex flex-row w-full items-center justify-start h-10 pl-4 gap-3 cursor-pointer rounded-lg transition-colors duration-150 hover:bg-pink-300 active:bg-pink-500">
            <img className="invert w-10 h-10" src={icon} alt={text} />
            <p className="text-white mt-3 font-semibold">{text}</p>
        </div>
    );
}

export default SidebarItem;