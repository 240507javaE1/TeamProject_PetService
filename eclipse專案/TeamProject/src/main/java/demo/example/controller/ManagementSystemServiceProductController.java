package demo.example.controller;

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

import demo.example.dao.ServiceProductRepository;
import demo.example.model.ServiceProduct;

@CrossOrigin("*")
@RestController
@RequestMapping("/serviceProductM")
public class ManagementSystemServiceProductController implements CommandLineRunner{

	@Autowired
	ServiceProductRepository dao;
	
//	@GetMapping
//	public List<ServiceProduct> getAllServiceProduct(){
//		return dao.findAll();
//	}
	
	@PostMapping
	public void saveServiceProduct(@RequestBody ServiceProduct svp) {
		dao.save(svp);
	}
	
	@PutMapping("/{serviceProductIdM}")
	public void updateServiceProduct(@PathVariable("serviceProductIdM")Integer ID ,@RequestBody ServiceProduct svp) {
		ServiceProduct s=dao.findAll().stream().filter(s1->s1.getID()==ID).findAny().orElse(null);
		System.out.println(svp.getID());
		s.setID(svp.getID());
		s.setMemberID(svp.getMemberID());
		s.setServiceType(svp.getServiceType());
		s.setPrice(svp.getPrice());
		dao.save(s);
	}
	
	@DeleteMapping("/{serviceProductIdM}")
	public void deleteServiceProduct(@PathVariable("serviceProductIdM")Integer ID) {
		ServiceProduct s=dao.findAll().stream().filter(s1->s1.getID()==ID).findAny().orElse(null);
		System.out.println("delete:"+s.toString());
		if(s!=null)
			dao.delete(s);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}

}
