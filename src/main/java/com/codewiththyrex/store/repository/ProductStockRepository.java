package com.codewiththyrex.store.repository;

import com.codewiththyrex.store.entity.ProductStock;
import com.codewiththyrex.store.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStock, Long> {

    List<ProductStock> findByStockQuantityLessThan(int quantity);

    // Find the stock row for a specific product + size
    Optional<ProductStock> findByProduct_IdAndSize(Long productId, Size size);
}