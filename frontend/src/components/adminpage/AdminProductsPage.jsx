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

// --- Brand tokens, pulled from the sidebar red / white content layout ---
const BRAND_RED = "#E4262B";
const BRAND_RED_DARK = "#B01C20";
const BRAND_RED_SOFT = "#FBE9E9";

function makeSku(category) {
  const code = CATEGORY_CODE[category] || "GEN";
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${code}-${n}`;
}

function AddProduct({dialogOpen, onClose}){
  return <Dialog open={dialogOpen} onClose={() => {onClose(false)}}>
    <DialogTitle>Fill in the product details</DialogTitle>
    <DialogContent>
      <div className="flex flex-col gap-3">
        <TextField id="outlined-basic" label="Name" variant="outlined"/>
        <TextField id="outlined-basic" label="Description" variant="outlined"/>
          <TextField
              label="Price"
              type="number"
              variant="outlined"
              inputProps={{ min: 10, max: 40 }}
          />
          <p>Stock amount</p>
          <div className="flex flex-row gap-3">
              <TextField type="number" label="S"></TextField>
              <TextField type="number" label="M"></TextField>
              <TextField type="number" label="L"></TextField>
              <TextField type="number" label="XL"></TextField>
          </div>
          <Button sx={{backgroundColor:"red"}} className="bg-red" variant="contained">Create Product</Button>
      </div>
    </DialogContent>
  </Dialog>
}

function ProductCard(){

}

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
            <p className="text-sm text-gray-500 mt-1">
              {/*{products.length} products units on hand*/}
            </p>
          </div>
          <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={() => setDialogOpen(true)}
              sx={{
                position: "fixed",
                top: 32,      // px, matches your top-8
                right: 32,    // px, matches your right-8
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
        <hr/>
        <AddProduct dialogOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
      </div>
  );
}

export default AdminProductsPage;