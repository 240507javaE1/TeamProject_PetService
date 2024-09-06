package demo.example.controller;

import demo.example.dao.AnimalRepository;
import demo.example.model.Animal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/animals2")
public class AnimalController3 {
	
	@Autowired
	AnimalRepository animalRepository;
	
	@GetMapping
	public List<Animal>getAllAnimals(){
		return animalRepository.findAll();
	}
	
	//find來自memberID上傳的動物
	@GetMapping("/memberid/{id}")
	public List<Animal> getAnimalsBymemberID(@PathVariable Integer id){
		return animalRepository.findByMemberID(id);
	}
	
	//find來自animalID的動物
	@GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Integer id) {
		Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Animal not found with id " + id));
        return ResponseEntity.ok(animal); 
    }

	@PostMapping("/submit")
    public ResponseEntity<?> submitAnimal(@RequestParam Map<String, String> params,
                                          @RequestParam("file") MultipartFile file){ 
        try {
            Animal animal = new Animal();
            animal.setAnimalName(params.get("animalName"));
            animal.setAnimalGender(params.get("animalGender"));
            animal.setAnimalType(params.get("animalType"));
            animal.setAnimalAge(params.get("animalAge"));
            animal.setAnimalPersonality(params.get("animalPersonality"));
            animal.setAnimalChipID(params.get("animalChipID"));
            animal.setAnimalLocation(params.get("animalLocation"));
            animal.setAnimalSize(params.get("animalSize"));
            animal.setIsVaccine(Boolean.parseBoolean(params.get("isVaccine")));
            animal.setAnimalMemo(params.get("animalMemo"));
            animal.setIsNeuter(Boolean.parseBoolean(params.get("isNeuter")));
            animal.setAnimalHealth(params.get("animalHealth"));
            animal.setMemberID(Integer.parseInt(params.get("memberID")));
            
            if (!file.isEmpty()) {
                // Define path to save files within the static folder
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path uploadPath = Paths.get("src/main/resources/static/uploads/animal_photos/");
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                animal.setAnimalPhoto(fileName);
            }
            
            Animal savedAnimal = animalRepository.save(animal);
            return ResponseEntity.ok("Animal saved successfully with ID: " + savedAnimal.getAnimalID());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error processing image: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error saving animal: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnimal(@PathVariable Integer id) {
        if (!animalRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Animal not found with id " + id);
        }
        animalRepository.deleteById(id);
        return ResponseEntity.ok("Animal deleted successfully");
    }
      
}