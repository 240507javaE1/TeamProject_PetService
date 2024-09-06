package demo.example.controller;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.OrderRepository;

import demo.example.model.Order;
import demo.example.service.MemberService;
//import demo.example.service.OrderService;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderRepository orderDAO;
    
//    @Autowired
//    private OrderService orderService;
    
    @GetMapping
    public List<Order> getAllOrders(){
    	return orderDAO.findAll();
    }

 // 根據 memberID（role1MemberID）搜索訂單
    @GetMapping("/search/{memberID}")
    public ResponseEntity<List<Order>> getOrdersByMemberID(@PathVariable("memberID") int memberID){
        List<Order> orders = orderDAO.findByRole1MemberID(memberID);
        if (orders.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orders);
    }
    

    
    
 //新增order     
    @PostMapping
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        try {
            int newOrderId = orderDAO.findAll().stream()
                                .max(Comparator.comparing(Order::getOrderID))
                                .map(Order::getOrderID)
                                .orElse(0) + 1;
            order.setOrderID(newOrderId);
            order.setOrderCreateDate(LocalDateTime.now()); // 設置創建日期為當前時間
            Order savedOrder = orderDAO.save(order);
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    

//刪除order    	
 @DeleteMapping("/{orderID}")
    public ResponseEntity<Order> deleteOrder(@PathVariable("orderID") Integer orderID) {
    	 Order existingOrder = orderDAO.findById(orderID).orElse(null);
    	 if(existingOrder != null) {
    		 orderDAO.delete(existingOrder);
    		 System.out.println("delete: " + existingOrder.toString());
    		 return ResponseEntity.status(200).body(existingOrder);
    	 }else {
    		 System.out.println("Order not found with ID: " + orderID);
    		 return ResponseEntity.status(500).body(null);
    	 }
    	 
 	}


}

    

    
