import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";


interface AdminDashboardLayoutProps {
    role: string | null;
    children: React.ReactNode;
}


const AdminDashboardLayout = ({ children, role }: AdminDashboardLayoutProps) => {


    return (
        role === "ADMIN" ? (
            <>
                {redirect("./")}
            </>
        ) : (
            <div>
                <div >
                    <AdminSidebar />
                </div>
                <div>
                    {children}
                </div>
                
            </div>
        )
    );
};

export default AdminDashboardLayout;