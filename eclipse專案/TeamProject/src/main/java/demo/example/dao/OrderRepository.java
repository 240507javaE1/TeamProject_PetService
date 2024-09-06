package demo.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import demo.example.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer>{
	public List<Order> findByRole2MemberID(int id);
	public List<Order> findByRole2MemberIDAndOrderStatus(int id, String status);
    // 根據 role1MemberID 搜索訂單
    List<Order> findByRole1MemberID(int role1MemberID);
    
    // 根據 role2MemberID 搜索訂單
    //List<Order> findByRole2MemberID(int role2MemberID);

}
