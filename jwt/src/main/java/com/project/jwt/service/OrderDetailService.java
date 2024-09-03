package com.project.jwt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.jwt.configuration.JwtRequestFilter;
import com.project.jwt.dao.CartDao;
import com.project.jwt.dao.OrderDetailDao;
import com.project.jwt.dao.ProductDao;
import com.project.jwt.dao.UserDao;
import com.project.jwt.entity.Cart;
import com.project.jwt.entity.OrderDetail;
import com.project.jwt.entity.OrderInput;
import com.project.jwt.entity.OrderProductQuantity;
import com.project.jwt.entity.Product;
import com.project.jwt.entity.User;

import java.util.ArrayList;
import java.util.List;


@Service
public class OrderDetailService {

    private static final String ORDER_PLACED = "Placed";

    @Autowired
    private OrderDetailDao orderDetailDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CartDao cartDao;

    public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckout){
            
        List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();

         for (OrderProductQuantity o: productQuantityList) {
            Product product = productDao.findById(o.getProductId()).get();

            String currentUser = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(currentUser).get(); 

            OrderDetail orderDetail = new OrderDetail(
                  orderInput.getFullName(),
                  orderInput.getFullAddress(),
                  orderInput.getContactNumber(),
                  orderInput.getAlternateContactNumber(),
                    ORDER_PLACED,
                    product.getProductDiscountedPrice() * o.getQuantity(),
                    product,
                    user,
                    orderInput.getTransactionId()
            );

            // empty the cart.
            if(!isSingleProductCheckout) {
                List<Cart> carts = cartDao.findByUser(user);
                carts.stream().forEach(x -> cartDao.deleteById(x.getCartId()));
            } 

            orderDetailDao.save(orderDetail);
        }
    }

    public List<OrderDetail> getOrderDetails() {
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).get();

        return orderDetailDao.findByUser(user);
    }
}
