import AdminPageSidebar from "../components/adminpage/AdminPageSidebar.jsx";
import AdminProductsPage from "../components/adminpage/AdminProductsPage.jsx";

function AdminPage() {

    return (
        <div className="flex">
            <AdminPageSidebar></AdminPageSidebar>
            <AdminProductsPage></AdminProductsPage>
        </div>
    );
}

export default AdminPage;