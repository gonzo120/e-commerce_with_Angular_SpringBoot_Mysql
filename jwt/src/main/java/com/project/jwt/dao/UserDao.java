package com.project.jwt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.jwt.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, String> {

}
