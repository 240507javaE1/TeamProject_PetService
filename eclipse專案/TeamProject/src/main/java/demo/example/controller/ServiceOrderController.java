package demo.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.OrderRepository;
import demo.example.model.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/serviceorder")
public class ServiceOrderController {
	@Autowired
	OrderRepository orderDAO;

	// 小幫手後台訂單列表
	@GetMapping("/{id}")
	public List<Order> getAllOrder(@PathVariable("id") int memberID) {
		return orderDAO.findByRole2MemberID(memberID);
	}

	// 網址帶memberID跟訂單狀態，用來篩選訂單資料給小幫手確認
	@GetMapping("/{id}/{status}")
	public List<Order> getOrderByStatus(@PathVariable("id") int memberID, @PathVariable("status") String status) {
		if(status.equals("check")) {
			status="確認";
		}else if(status.equals("reject")) {
			status="拒絕";
		}else {
			status="未確認";
		}
		return orderDAO.findByRole2MemberIDAndOrderStatus(memberID, status);
	}

	// 網址帶orderID，是小幫手某個訂單的詳細資料
	@GetMapping("/orderdetail/{orderid}")
	public Order getOrder(@PathVariable("orderid") int orderID) {
		return orderDAO.findById(orderID).get();
	}
	
	//修改訂單狀態
	@PutMapping("/{orderid}/{status}")
	public Order changeOrderStatus(@PathVariable("orderid") int orderID, @PathVariable("status") String status) {
		Order o = orderDAO.findById(orderID).get();
		if(status.equals("confirm")) {
			o.setOrderStatus("確認");
		}else {
			o.setOrderStatus("拒絕");
		}
		return orderDAO.save(o);
	}

}
