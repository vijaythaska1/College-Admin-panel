import { Sidebar } from './Sidebar.jsx'
import { Navbars } from './Navbars.jsx'
import { Footer } from './Footer.jsx';
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className='w-full h-screen flex bg-gray-100'>
            <div className='min-h-full'>
                <Sidebar />
            </div>
            <div className='flex flex-col w-full'>
                <Navbars />
                <div className='w-full h-full p-4  overflow-scroll'>
                    <Outlet />
                    <div className='w-full flex justify-end'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;
