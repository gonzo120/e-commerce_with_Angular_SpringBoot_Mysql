package com.project.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.jwt.entity.Product;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
    /* public List<Product> findAll(Pageable pageable);

    public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
            String key1, String key2, Pageable pageable
    ); */
}