package demo.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import demo.example.model.OrderDetail;
import demo.example.model.OrderDetailPK;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,OrderDetailPK>{

}
