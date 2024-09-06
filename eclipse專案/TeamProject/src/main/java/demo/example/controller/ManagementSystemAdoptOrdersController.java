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

import demo.example.dao.AdoptOrdersRepository;
import demo.example.model.AdoptOrder;

@CrossOrigin("*")
@RestController
@RequestMapping("/adoptOrdersM")
public class ManagementSystemAdoptOrdersController implements CommandLineRunner {
	
	@Autowired
	AdoptOrdersRepository dao;
	
	@GetMapping
	public List<AdoptOrder> getAllAdoptOrders(){
		return dao.findAll();
	}
	
	@PostMapping
	public void saveAdoptOrders(@RequestBody AdoptOrder ado) {
		int v=dao.findAll().stream().max(Comparator.comparing(e -> e.getAdoptID())).get().getAdoptID()+1;
		ado.setAdoptID(v);
		System.out.println("save:"+ado.toString());
		dao.save(ado);
	}
	
	@PutMapping("/{adoptIdM}")
	public void updateAdoptOrders(@PathVariable("adoptIdM")Integer adoptId ,@RequestBody AdoptOrder ado) {
		AdoptOrder a=dao.findAll().stream().filter(a1->a1.getAdoptID()==adoptId).findAny().orElse(null);
		System.out.println("update:"+a.toString());
		a.setAdoptID(ado.getAdoptID());
		a.setMemberID(ado.getMemberID());
		a.setAnimalID(ado.getAnimalID());
		a.setOrderCreateTime(ado.getOrderCreateTime());
		a.setOrderMemo(ado.getOrderMemo());
		dao.save(a);
	}
	
	@DeleteMapping("/{adoptIdM}")
	public void deleteAdoptOrders(@PathVariable("adoptIdM")Integer adoptId){
		AdoptOrder a=dao.findAll().stream().filter(a1->a1.getAdoptID()==adoptId).findAny().orElse(null);
		System.out.println("delete:"+a.toString());
		if(a!=null)
			dao.delete(a);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}

}
