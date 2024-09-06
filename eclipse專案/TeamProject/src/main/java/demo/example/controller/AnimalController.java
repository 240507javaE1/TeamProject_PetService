package demo.example.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

import demo.example.model.*;
import demo.example.dao.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/animals")

public class AnimalController {
	
	@Autowired
	AnimalRepository animalDAO;
	@Autowired
	AnimalDAO animalService;
	
	@GetMapping
	public List<Animal>getAllAnimals(){
		return animalDAO.findAll();
	}
	//find來自memberID上傳的動物
	@GetMapping("/memberid/{id}")
	public List<Animal> getAnimalsBymemberID(@PathVariable Integer id){
		return animalDAO.findByMemberID(id);
	}
	//find來自filter篩選的動物,適用於kevin的animalupload.html, by kevin ask gpt
	@PostMapping("/filter")
	public List<Animal> getAnimalsByfilter(@RequestBody Animal animalfilter){
		System.out.println("CHECK : "+animalfilter);
		return animalService.findByfilter(animalfilter);
	}
	
	@GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Integer id) {
		Animal animal = animalDAO.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal not found with id " + id));
        return ResponseEntity.ok(animal); 
    }
	
//	@PostMapping
//	public void saveAnimal(@RequestBody Animal ani) {
//		int v=animalDAO.findAll().stream().filter(a1->a1.getAnimalID() == id).findAny().orElse(null);
//		ani.setAnimalID(v);
//		System.out.println("save:" +ani.toString());
//		animalDAO.save(ani);
		
//	}
	
// id一樣會修改，否則會新增id	
	@PostMapping
    public ResponseEntity<Animal> addAnimal(@RequestBody Animal animal) {
        Animal savedAnimal = animalDAO.save(animal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
	}
// 上傳animalPhoto並存入特定folder的方法,適用於kevin的animalupload.html, by kevin ask gpt
	@PostMapping("/savephoto")
	public ResponseEntity<?> addAnimalandSavePhoto(
						@RequestPart("animalModel") String animalJson,
						@RequestPart("animalPhoto") MultipartFile file) {
	    return animalService.addAnimalandSavePhoto(animalJson, file);
	}
	
	@PutMapping("/{id}")
	public void updateAnimal(@PathVariable Integer id,@RequestBody Animal anim) {
		Animal a=animalDAO.findAll().stream().filter(a1->a1.getAnimalID() == id).findAny().orElse(null);
		System.out.print("update:" + a.toString());
		a.setAnimalName(anim.getAnimalName());
		a.setAnimalGender(anim.getAnimalGender());
		a.setAnimalType(anim.getAnimalType());
		a.setAnimalAge(anim.getAnimalAge());
		a.setAnimalPersonality(anim.getAnimalPersonality());
		a.setAnimalChipID(anim.getAnimalChipID());
		a.setAnimalLocation(anim.getAnimalLocation());
		a.setAnimalSize(anim.getAnimalSize());
		a.setIsVaccine(anim.getIsVaccine());
		a.setAnimalMemo(anim.getAnimalMemo());
		a.setIsNeuter(anim.getIsNeuter());
		a.setAnimalHealth(anim.getAnimalHealth());
		animalDAO.save(anim);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteAnimal(@PathVariable Integer id) throws Exception {
	    if (animalDAO.existsById(id)) {
	    	animalDAO.deleteById(id);
	        return ResponseEntity.noContent().build();
	    }
	    throw new Exception("Animal not found with id " + id);
	}	


}
