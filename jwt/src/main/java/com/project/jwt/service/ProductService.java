package com.project.jwt.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.project.jwt.dao.ProductDao;
import com.project.jwt.dao.UserDao;
import com.project.jwt.entity.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getAllProducts() {
        /* Pageable pageable = PageRequest.of(pageNumber,12);

        if(searchKey.equals("")) {
            return (List<Product>) productDao.findAll(pageable);
        } else {
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
                    searchKey, searchKey, pageable
            );
        } */
        return (List<Product>) productDao.findAll();
    }

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }
    public Product getProductDetailsById(Integer productId) {
        return productDao.findById(productId).get();
    }
}
