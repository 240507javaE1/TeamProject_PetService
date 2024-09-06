package demo.example.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.MemberRepository;
import demo.example.model.*;
import demo.example.service.MemberService;

@CrossOrigin("*")
@RestController
@RequestMapping("/member")
public class MemberController {
	@Autowired
	 private MemberService memberService;
	@Autowired
	 private MemberRepository memberDAO;

//找所有的Member
	@GetMapping
	 public List<Member> getAllMembers() {
		return memberDAO.findAll();
	}
		
//找符合服務項目、地點、時間的member
	@GetMapping("/search")
	 public List<Member> searchMembers(
	     @RequestParam("serviceType") String serviceType,
	     @RequestParam("cityName") String cityName ,
	 	 @RequestParam("distName") String distName,
	 	 @RequestParam("startDate")String startDate, 
	 	 @RequestParam("endDate")String endDate, 
	 	 @RequestParam("startTime")String startTime, 
	 	 @RequestParam("endTime")String endTime) 	
	{

	     return memberService.findMembers(serviceType, cityName, distName,
                startDate, endDate,startTime, endTime);
	 }
	 
	// 註冊member用的方法
	@PostMapping
	public ResponseEntity<Member> addMember(@RequestBody Member userModel) {
	    Member savedMember = memberDAO.save(userModel);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
	}
	//帳號密碼找Member，登入用
	@GetMapping("/{username}/{password}")
	public ResponseEntity<Member> memberLogin(@PathVariable String username, 
	        								@PathVariable String password) {
		List<Member> members =memberDAO.findByUsernameAndPassword(username, password);
		if (members.isEmpty()) {
            return ResponseEntity.notFound().build(); // 返回404 Not Found
        } else {
            return ResponseEntity.ok(members.get(0)); // 返回第一个Member
        }
	}

}
