package com.codewiththyrex.store.controller;

import com.codewiththyrex.store.entity.Product;
import com.codewiththyrex.store.entity.ProductStock;
import com.codewiththyrex.store.entity.Size;
import com.codewiththyrex.store.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /api/products/5
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // GET /api/products/search?keyword=shirt
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProductsByName(keyword);
    }

    // POST /api/products
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product createProduct(@RequestBody CreateProductRequest request) {
        return productService.createProduct(
                request.name(),
                request.description(),
                request.price(),
                request.sku(),
                request.stock()
        );
    }

    // PUT /api/products/5
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody UpdateProductRequest request) {
        return productService.updateProduct(
                id,
                request.name(),
                request.description(),
                request.price()
        );
    }

    // PATCH /api/products/5/stock  (body: { "size": "M", "quantity": 50 })
    @PatchMapping("/{id}/stock")
    public ProductStock updateStock(@PathVariable Long id, @RequestBody UpdateStockRequest request) {
        return productService.updateStock(id, request.size(), request.quantity());
    }

    // PATCH /api/products/5/stock/adjust  (body: { "size": "M", "delta": -3 })
    @PatchMapping("/{id}/stock/adjust")
    public ProductStock adjustStock(@PathVariable Long id, @RequestBody AdjustStockRequest request) {
        return productService.adjustStock(id, request.size(), request.delta());
    }

    // PATCH /api/products/5/deactivate
    @PatchMapping("/{id}/deactivate")
    public Product deactivateProduct(@PathVariable Long id) {
        return productService.deactivateProduct(id);
    }

    // PATCH /api/products/5/activate
    @PatchMapping("/{id}/activate")
    public Product activateProduct(@PathVariable Long id) {
        return productService.activateProduct(id);
    }

    // --- Request body shapes (records) ---

    public record CreateProductRequest(String name, String description, BigDecimal price, String sku, Map<Size, Integer> stock) {}

    public record UpdateProductRequest(String name, String description, BigDecimal price) {}

    public record UpdateStockRequest(Size size, int quantity) {}

    public record AdjustStockRequest(Size size, int delta) {}
}