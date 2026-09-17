import { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import { Plus, Trash2, Search, X } from "lucide-react";
import ImageUploadBox from "./ImageUploadBox.jsx";
import InputAdornment from "@mui/material/InputAdornment";

// --- Brand tokens, pulled from the sidebar red / white content layout ---
const BRAND_RED = "#E4262B";
const BRAND_RED_DARK = "#B01C20";
const BRAND_RED_SOFT = "#FBE9E9";

// --- Mirrors com.codewiththyrex.store.entity.Gender ---
const GENDER_OPTIONS = [
    { value: "MEN", code: "MEN", label: "Men" },
    { value: "WOMEN", code: "WMN", label: "Women" },
    { value: "KIDS", code: "KID", label: "Kids" },
    { value: "UNISEX", code: "UNI", label: "Unisex" },
];

// --- Mirrors com.codewiththyrex.store.entity.ClothingCategory ---
const CATEGORY_OPTIONS = [
    // Tops
    { value: "TSHIRT", code: "TSH", label: "T-Shirt" },
    { value: "SHIRT", code: "SHT", label: "Shirt" },
    { value: "TANK_TOP", code: "TNK", label: "Tank Top" },
    { value: "SWEATER", code: "SWT", label: "Sweater" },
    { value: "HOODIE", code: "HOD", label: "Hoodie" },

    // Bottoms
    { value: "JEANS", code: "JNS", label: "Jeans" },
    { value: "TROUSERS", code: "TRS", label: "Trousers" },
    { value: "SHORTS", code: "SHR", label: "Shorts" },
    { value: "SKIRT", code: "SKT", label: "Skirt" },

    // Outerwear
    { value: "JACKET", code: "JKT", label: "Jacket" },
    { value: "COAT", code: "COT", label: "Coat" },
    { value: "BLAZER", code: "BLZ", label: "Blazer" },
    { value: "VEST", code: "VST", label: "Vest" },

    // Dresses & Jumpsuits
    { value: "DRESS", code: "DRS", label: "Dress" },
];

function AddProduct({ dialogOpen, onClose, onCreated, onError }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState({ S: "", M: "", L: "", XL: "" });
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({}); // { name?, price?, gender?, category? }

    const stockPayload = Object.fromEntries(
        Object.entries(stock).map(([size, qty]) => [
            size,
            qty === "" ? 0 : Number(qty),
        ])
    );

    function resetForm() {
        setName("");
        setDescription("");
        setGender("");
        setCategory("");
        setPrice("");
        setStock({ S: "", M: "", L: "", XL: "" });
        setErrors({});
    }

    function handleClose() {
        if (submitting) return; // don't allow closing mid-request
        resetForm();
        onClose(false);
    }

    function validate() {
        const next = {};
        if (!name.trim()) next.name = "Name is required";
        if (price === "" || price === null) {
            next.price = "Price is required";
        } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
            next.price = "Enter a valid price";
        }
        if (!gender) next.gender = "Gender is required";
        if (!category) next.category = "Category is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSubmit() {
        if (submitting) return;
        if (!validate()) {
            onError?.("Please fill in the required fields");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description,
                    gender,
                    category,
                    price: Number(price),
                    stock: stockPayload,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || `Request failed (${res.status})`);
            }

            const created = await res.json();
            onCreated?.(created);
            resetForm();
            onClose(false);
        } catch (error) {
            onError?.(error.message || "Failed to create product");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Dialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle>Fill in the product details</DialogTitle>
            <DialogContent>
                <div className="flex flex-col gap-3">
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex flex-row gap-3">
                        <TextField
                            select
                            label="Gender"
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value);
                                if (errors.gender)
                                    setErrors((p) => ({ ...p, gender: undefined }));
                            }}
                            error={!!errors.gender}
                            helperText={errors.gender}
                            required
                            fullWidth
                        >
                            {GENDER_OPTIONS.map((g) => (
                                <MenuItem key={g.value} value={g.value}>
                                    {g.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Category"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                if (errors.category)
                                    setErrors((p) => ({ ...p, category: undefined }));
                            }}
                            error={!!errors.category}
                            helperText={errors.category}
                            required
                            fullWidth
                        >
                            {CATEGORY_OPTIONS.map((c) => (
                                <MenuItem key={c.value} value={c.value}>
                                    {c.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <h5>Insert an image</h5>
                    <ImageUploadBox />
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        slotProps={{ htmlInput: { min: 10, max: 40, step:"0.01" },
                            input: {
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            },}}
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                            if (errors.price) setErrors((p) => ({ ...p, price: undefined }));
                        }}
                        error={!!errors.price}
                        helperText={errors.price}
                        required
                    />
                    <p>Stock amount</p>
                    <div className="flex flex-row gap-3">
                        {["S", "M", "L", "XL"].map((size) => (
                            <TextField
                                key={size}
                                type="number"
                                label={size}
                                value={stock[size]}
                                onChange={(e) =>
                                    setStock((prev) => ({ ...prev, [size]: e.target.value }))
                                }
                                slotProps={{ htmlInput: { min: 0 } }}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        sx={{ backgroundColor: BRAND_RED }}
                        variant="contained"
                    >
                        {submitting ? "Creating…" : "Create Product"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ProductCard() {}

function AdminProductsPage() {
    // const [products, setProducts] = useState();
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    // const [form, setForm] = useState(emptyForm);
    const [toast, setToast] = useState("");

    function stockChip(stock) {
        if (stock === 0) return { label: "Sold out", color: "error" };
        if (stock <= 5) return { label: "Low stock", color: "warning" };
        return { label: "In stock", color: "success" };
    }

    return (
        <div className="min-h-screen bg-red-400 px-8 py-8 flex-1">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome to the products page
                    </h1>
                    <p className="text-sm text-gray-500 mt-1"></p>
                </div>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => setDialogOpen(true)}
                    sx={{
                        position: "fixed",
                        top: 32, // px, matches your top-8
                        right: 32, // px, matches your right-8
                        zIndex: 20,
                        backgroundColor: BRAND_RED,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { backgroundColor: BRAND_RED_DARK },
                    }}
                >
                    Add product
                </Button>
            </div>
            <hr />
            <AddProduct
                dialogOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onCreated={(created) => setToast(`${created.name} created`)}
                onError={(msg) => setToast(msg)}
            />
            <Snackbar
                open={!!toast}
                message={toast}
                autoHideDuration={4000}
                onClose={() => setToast("")}
            />
        </div>
    );
}

export default AdminProductsPage;