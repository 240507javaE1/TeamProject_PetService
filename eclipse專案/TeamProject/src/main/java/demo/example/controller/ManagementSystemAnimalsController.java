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

import demo.example.dao.AnimalRepository;
import demo.example.model.Animal;
import demo.example.model.ServiceProduct;

@CrossOrigin("*")
@RestController
@RequestMapping("/animalM")
public class ManagementSystemAnimalsController implements CommandLineRunner{
	
	@Autowired
	AnimalRepository dao;
	
	@PostMapping
	public void saveAnimal(@RequestBody Animal anm) {
		dao.save(anm);
	}
	
//	@PutMapping("/{animalIdM}")
//	public void updateAnimal(@PathVariable("animalId")Integer animalId ,@RequestBody Animal anm) {
//		Animal a=dao.findAll().stream().filter(a1->a1.getAnimalID()==animalId).findAny().orElse(null);
//		System.out.println(anm.getAnimalID());
//		a.setAnimalID(anm.getAnimalID());
//		a.setMemberID(anm.getMemberID());
//		a.setAnimalName(anm.getAnimalName());
//		a.setAnimalGender(anm.getAnimalGender());
//		a.setAnimalType(anm.getAnimalType());
//		a.setAnimalAge(anm.getAnimalAge());
//		a.setAnimalPersonality(anm.getAnimalPersonality());
//		a.setAnimalHealth(anm.getAnimalHealth());
//		a.setAnimalChipID(anm.getAnimalChipID());
//		a.setAnimalLocation(anm.getAnimalLocation());
//		a.setAnimalSize(anm.getAnimalSize());
//		a.setIsVaccine(anm.getIsVaccine());
//		a.setIsNeuter(anm.getIsNeuter());
//		a.setAnimalPhoto(anm.getAnimalPhoto());
//		a.setAnimalMemo(anm.getAnimalMemo());
//		dao.save(a);
//	}
	
	@DeleteMapping("/{animalIdM}")
	public void deleteAnimal(@PathVariable("animalIdM")Integer animalId) {
		Animal a=dao.findAll().stream().filter(a1->a1.getAnimalID()==animalId).findAny().orElse(null);
		System.out.println("delete:"+a.toString());
		if(a!=null)
			dao.delete(a);
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	
}
