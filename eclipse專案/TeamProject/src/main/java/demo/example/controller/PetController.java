package demo.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.OrderRepository;
import demo.example.dao.PetRepository;
import demo.example.model.Order;
import demo.example.model.Pet;

@CrossOrigin("*")
@RestController
@RequestMapping("/pet")
public class PetController {
	@Autowired
    private PetRepository petDAO;
	

	 
	// 根據 memberID 搜索 pet
	    @GetMapping("/search/{memberID}")
	    public ResponseEntity<List<Pet>> getPetByMemberID(@PathVariable("memberID") int memberID) {
	        List<Pet> pets = petDAO.findByMemberID(memberID);
	        if (pets.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.ok(pets);
	    }

}
