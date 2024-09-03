package com.project.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.jwt.entity.Cart;
import com.project.jwt.entity.User;

import java.util.List;

@Repository
public interface CartDao extends JpaRepository<Cart, Integer > {
    public List<Cart> findByUser(User user);
}