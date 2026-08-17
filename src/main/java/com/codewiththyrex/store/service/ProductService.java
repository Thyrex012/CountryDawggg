package com.codewiththyrex.store.service;

import com.codewiththyrex.store.entity.Product;
import com.codewiththyrex.store.entity.ProductStock;
import com.codewiththyrex.store.entity.Size;
import com.codewiththyrex.store.exception.ProductNotFoundException;
import com.codewiththyrex.store.repository.ProductRepository;
import com.codewiththyrex.store.repository.ProductStockRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductStockRepository productStockRepository;

    public ProductService(ProductRepository productRepository, ProductStockRepository productStockRepository) {
        this.productRepository = productRepository;
        this.productStockRepository = productStockRepository;
    }

    // --- CREATE ---

    public Product createProduct(String name, String description, BigDecimal price, String sku, Map<Size, Integer> stockBySize) {
        Product product = new Product(name, description, price, sku);

        stockBySize.forEach((size, quantity) -> {
            ProductStock stock = new ProductStock();
            stock.setSize(size);
            stock.setStockQuantity(quantity);
            product.addStock(stock);   // this is doing the double-sync work we just walked through
        });

        return productRepository.save(product);  // cascade saves Product + all ProductStock rows in one call
    }

    // --- READS ---

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    public List<Product> searchProductsByName(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<ProductStock> getLowStockProducts(int threshold) {
        return productStockRepository.findByStockQuantityLessThan(threshold);
    }

    // --- Update ---

    public Product updateProduct(Long id, String name, String description, BigDecimal price) {
        Product product = getProductById(id);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        return productRepository.save(product);
    }

    // Overwrite stock to an exact value for a given product + size
    public ProductStock updateStock(Long productId, Size size, int newQuantity) {
        ProductStock stock = productStockRepository.findByProduct_IdAndSize(productId, size)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No stock entry for product id: " + productId + ", size: " + size));

        stock.setStockQuantity(newQuantity);
        return productStockRepository.save(stock);
    }

    // Apply a relative change to stock for a given product + size
    public ProductStock adjustStock(Long productId, Size size, int delta) {
        ProductStock stock = productStockRepository.findByProduct_IdAndSize(productId, size)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No stock entry for product id: " + productId + ", size: " + size));

        int newQuantity = stock.getStockQuantity() + delta;
        if (newQuantity < 0) {
            throw new IllegalArgumentException(
                    "Insufficient stock for product id: " + productId + ", size: " + size);
        }

        stock.setStockQuantity(newQuantity);
        return productStockRepository.save(stock);
    }

    // --- Activate / Deactivate ---

    public Product deactivateProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(false);
        return productRepository.save(product);
    }

    public Product activateProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(true);
        return productRepository.save(product);
    }


}
