package demo.example.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.classic.util.ClassicEnvUtil;
import demo.example.dao.OrderRepository;
import demo.example.model.Order;

@CrossOrigin("*")
@RestController
@RequestMapping("/order2")
public class ManagementSystemOrderController implements CommandLineRunner{
	
	@Autowired
	OrderRepository dao;
	
	@GetMapping
	public List<Order> getAllOrder(){
		return dao.findAll();
	}
	
	@PostMapping
	public void saveOrder(@RequestBody Order odr) {
//		int v=dao.findAll().stream().max(Comparator.comparing(v1 -> v1.getOrderID())).get().getOrderID()+1;
//		odr.setOrderID(v);
//		System.out.println("save:"+odr.toString());
		dao.save(odr);
	}
	
	@PutMapping("/{orderId}")
	public void updateOrder(@PathVariable("orderId")Integer orderId ,@RequestBody Order odr) {
		Order o=dao.findAll().stream().filter(o1->o1.getOrderID()==orderId).findAny().orElse(null);
		System.out.println("update:"+o.toString());
		o.setOrderID(odr.getOrderID());
		o.setRole1MemberID(odr.getRole1MemberID());
		o.setRole2MemberID(odr.getRole2MemberID());
		o.setOrderAddress(odr.getOrderAddress());
		o.setServiceDate(odr.getServiceDate());
		o.setServiceTime(odr.getServiceTime());
		o.setPetID(odr.getPetID());
		o.setOrderMemo(odr.getOrderMemo());
		o.setTotal(odr.getTotal());
		o.setOrderStatus(odr.getOrderStatus());
		o.setOrderCreateDate(odr.getOrderCreateDate());
		dao.save(o);
	}
	
	@DeleteMapping("/{orderId}")
	public void deleteOrder(@PathVariable("orderId")Integer orderId) {
		Order o=dao.findAll().stream().filter(o1->o1.getOrderID()==orderId).findAny().orElse(null);
		System.out.println("delete:"+o.toString());
		if(o!=null)
			dao.delete(o);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}
}