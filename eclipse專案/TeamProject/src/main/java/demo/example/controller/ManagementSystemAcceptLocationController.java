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

import demo.example.dao.AcceptLocationRepository;
import demo.example.model.AcceptLocation;
import demo.example.model.AcceptTime;

@CrossOrigin("*")
@RestController
@RequestMapping("/acceptLocationM")
public class ManagementSystemAcceptLocationController implements CommandLineRunner{
	
	@Autowired
	AcceptLocationRepository dao;
	
	@PostMapping
	public void saveAcceptLocation(@RequestBody AcceptLocation acl) {
		dao.save(acl);
	}
	
	@PutMapping("/{acceptLocationIdM}")
	public void updateAcceptTime(@PathVariable("acceptLocationIdM")Integer ID ,@RequestBody AcceptLocation acl) {
		AcceptLocation a=dao.findAll().stream().filter(a1->a1.getID()==ID).findAny().orElse(null);
		System.out.println("update:"+a.toString());
		a.setID(acl.getID());
		a.setCityName(acl.getCityName());
		a.setDistName(acl.getDistName());
		a.setMemberID(acl.getMemberID());
		dao.save(a);
	}
	
	@DeleteMapping("/{acceptLocationIdM}")
	public void deleteAcceptLocation(@PathVariable("acceptLocationIdM")Integer ID) {
		AcceptLocation a=dao.findAll().stream().filter(a1->a1.getID()==ID).findAny().orElse(null);
		System.out.println("delete:"+a.toString());
		if(a!=null)
			dao.delete(a);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}
}
