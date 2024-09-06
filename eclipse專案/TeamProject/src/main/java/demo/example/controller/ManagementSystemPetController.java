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

import demo.example.dao.PetRepository;
import demo.example.model.Pet;

@CrossOrigin("*")
@RestController
@RequestMapping("/petM")
public class ManagementSystemPetController implements CommandLineRunner {
	
	@Autowired
	PetRepository dao;
	
	@GetMapping
	public List<Pet> getAllPets(){
		return dao.findAll();
	}
	
	@PostMapping
	public void savePet(@RequestBody Pet pet) {
//		int v=dao.findAll().stream().max(Comparator.comparing(v1 -> v1.getPetID())).get().getPetID()+1;
//		pet.setPetID(v);
		System.out.println("save:"+pet.toString());
		dao.save(pet);
	}
	
	@PutMapping("/{petIdM}")
	public void updatePet(@PathVariable("petIdM")Integer petId ,@RequestBody Pet pet) {
		Pet p=dao.findAll().stream().filter(p1->p1.getPetID()==petId).findAny().orElse(null);
		System.out.println("update:"+p.toString());
		p.setPetID(pet.getPetID());
		p.setPetName(pet.getPetName());
		p.setPetGender(pet.getPetGender());
		p.setPetType(pet.getPetType());
		p.setPetAge(pet.getPetAge());
		p.setPetHealth(pet.getPetHealth());
		p.setPetSize(pet.getPetSize());
		p.setPetPhoto(pet.getPetPhoto());
		p.setMemberID(pet.getMemberID());
		dao.save(p);
	}
	
	@DeleteMapping("/{petIdM}")
	public void deletePet(@PathVariable("petIdM")Integer petId){
		Pet p=dao.findAll().stream().filter(p1->p1.getPetID()==petId).findAny().orElse(null);
		System.out.println("delete:"+p.toString());
		if(p!=null)
			dao.delete(p);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
	}

}
