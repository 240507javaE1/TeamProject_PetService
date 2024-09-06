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

import demo.example.dao.AcceptTimeRepository;
import demo.example.model.AcceptTime;
import demo.example.model.Order;

@CrossOrigin("*")
@RestController
@RequestMapping("/acceptTimeM")
public class ManagementSystemAcceptTimeController implements CommandLineRunner{
	
	@Autowired
	AcceptTimeRepository dao;
	
	@PostMapping
	public void saveAcceptTime(@RequestBody AcceptTime act) {
		dao.save(act);
	}
	
	@PutMapping("/{acceptTimeIdM}")
	public void updateAcceptTime(@PathVariable("acceptTimeIdM")Integer ID ,@RequestBody AcceptTime act) {
		AcceptTime a=dao.findAll().stream().filter(a1->a1.getID()==ID).findAny().orElse(null);
		System.out.println("update:"+a.toString());
		a.setID(act.getID());
		a.setMemberID(act.getMemberID());
		a.setStartDate(act.getStartDate());
		a.setEndDate(act.getEndDate());
		a.setStartTime(act.getStartTime());
		a.setEndTime(act.getEndTime());
		dao.save(a);
	}
	
	@DeleteMapping("/{acceptTimeIdM}")
	public void deleteAcceptTime(@PathVariable("acceptTimeIdM")Integer ID) {
		AcceptTime a=dao.findAll().stream().filter(a1->a1.getID()==ID).findAny().orElse(null);
		System.out.println("delete:"+a.toString());
		if(a!=null)
			dao.delete(a);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}
}
