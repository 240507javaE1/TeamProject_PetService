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

import demo.example.dao.MemberRepository;
import demo.example.model.Member;
import demo.example.model.Order;

@CrossOrigin("*")
@RestController
@RequestMapping("/memberM")
public class ManagementSystemMemberController implements CommandLineRunner {

	@Autowired
	MemberRepository dao;

//	@GetMapping
//	public List<Member> getAllMember(){
//		return dao.findAll();
//	}

	@PutMapping("/{memberIdM}")
	public void updateMember(@PathVariable("memberIdM") Integer memberId, @RequestBody Member mbr) {
		Member m = dao.findAll().stream().filter(m1 -> m1.getMemberID() == memberId).findAny().orElse(null);
		System.out.println("update" + mbr.toString());
		m.setMemberID(mbr.getMemberID());
		m.setName(mbr.getName());
		m.setUsername(mbr.getUsername());
		m.setPassword(mbr.getPassword());
		m.setEmail(mbr.getEmail());
		m.setPhone(mbr.getPhone());
		m.setAddress(mbr.getAddress());
		m.setGender(mbr.getGender());
		m.setRole1MemberID(mbr.getRole1MemberID());
		m.setRole2MemberID(mbr.getRole2MemberID());
		m.setRoleLevel(mbr.getRoleLevel());

	}

	@DeleteMapping("/{memberIdM}")
	public void deleteMember(@PathVariable("memberIdM") Integer memberId) {
		Member m = dao.findByMemberID(memberId);
		System.out.println("delete:" + m.toString());
		if (m != null)
			dao.delete(m);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}

}
