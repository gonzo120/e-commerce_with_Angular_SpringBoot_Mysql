package com.project.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.jwt.entity.OrderDetail;

@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Integer>{

}
