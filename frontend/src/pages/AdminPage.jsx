import { useNavigate } from "react-router-dom";

function AdminPage() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include", // required so the cookie is sent + the clearing cookie is accepted
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            navigate("/loginandsignup");
        }
    };

    return (
        <>
            <p>Hello world</p>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}

export default AdminPage;