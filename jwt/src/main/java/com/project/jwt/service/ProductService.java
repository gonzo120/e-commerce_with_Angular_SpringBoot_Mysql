package com.project.jwt.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.project.jwt.configuration.JwtRequestFilter;
import com.project.jwt.dao.CartDao;
import com.project.jwt.dao.ProductDao;
import com.project.jwt.dao.UserDao;
import com.project.jwt.entity.Cart;
import com.project.jwt.entity.Product;
import com.project.jwt.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    public Product addNewProduct(Product product) {
        return productDao.save(product);
    }

    

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }
    public Product getProductDetailsById(Integer productId) {
        return productDao.findById(productId).get();
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout,Integer productId) {
        if(isSingleProductCheckout && productId != 0) {
            // we are going to buy a single product

            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        } else {
            // we are going to checkout entire cart
            String username = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(username).get();
            List<Cart> carts = cartDao.findByUser(user); 
            /* return null; */
           return carts.stream().map(x -> x.getProduct()).collect(Collectors.toList());
        }
    
    }

    public List<Product> getAllProducts(String searchKey) {
       

        if(searchKey.equals("")) {
            return (List<Product>) productDao.findAll();
        } else {
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
                    searchKey, searchKey
            );
        }

    }
}
