package demo.example.dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import demo.example.model.Animal;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class AnimalDAO {
	@Autowired
	AnimalRepository dao;
	@Autowired
    private EntityManager entityManager;
	
//上傳animalPhoto並存入特定folder的方法,適用於kevin的animalupload.html, by kevin ask gpt
	public ResponseEntity<?> addAnimalandSavePhoto(String animalJson, MultipartFile file) {
		Animal animal;
		try {// put JSON into Animal object
		animal = new ObjectMapper().readValue(animalJson, Animal.class);
		}catch(IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid animal data");
        }
		if(file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Photofile uploaded");
        }
		//從這個專案directory往外找，到vsCode檔案/animalPhotos/
		System.out.println("Current working directory: " + new File("").getAbsolutePath());
		String folderUrl = new File("").getAbsolutePath()+"/../vsCode檔案/animalPhotos";
		File folder = new File(folderUrl);if(!folder.exists()) folder.mkdirs();
		String fileName = generateFileName(animal,folderUrl);
		File savedFile = new File(folder, fileName);
		try { // Save file to the specified location
	        file.transferTo(savedFile);
	    } catch (IOException e) {e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save photo file");
	    }
		// put (String)fileURL in Animal.animalPhotoUrl, return animal to Json
		String fileUrl = "../animalPhotos/" + fileName;
		animal.setAnimalPhoto(fileUrl);
		Animal savedAnimal = dao.save(animal);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedAnimal);
	}
//find來自filter篩選的動物,適用於kevin的animalupload.html, by kevin ask gpt
	public List<Animal> findByfilter(Animal Animalfilter) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Animal> cq = cb.createQuery(Animal.class);
		Root<Animal> root = cq.from(Animal.class);
		
		List<Predicate> predicates = new ArrayList<>();
		
		if (Animalfilter.getAnimalName() != null && !Animalfilter.getAnimalName().trim().isEmpty()) {
            predicates.add(cb.like(root.get("animalName"), "%" + Animalfilter.getAnimalName() + "%"));
        }
		if (Animalfilter.getAnimalGender() != null && !Animalfilter.getAnimalGender().trim().isEmpty()) {
            predicates.add(cb.equal(root.get("animalGender"), Animalfilter.getAnimalGender()));
        }
        if (Animalfilter.getAnimalType() != null && !Animalfilter.getAnimalType().trim().isEmpty()) {
            predicates.add(cb.equal(root.get("animalType"), Animalfilter.getAnimalType()));
        }
        if (Animalfilter.getAnimalAge() != null && !Animalfilter.getAnimalAge().trim().isEmpty()) {
            predicates.add(cb.equal(root.get("animalAge"), Animalfilter.getAnimalAge()));
        }
        if (Animalfilter.getAnimalPersonality() != null && !Animalfilter.getAnimalPersonality().trim().isEmpty()) {
            predicates.add(cb.like(root.get("animalPersonality"), "%" + Animalfilter.getAnimalPersonality() + "%"));
        }
        if (Animalfilter.getAnimalChipID() != null && !Animalfilter.getAnimalChipID().trim().isEmpty()) {
            predicates.add(cb.equal(root.get("animalChipID"), Animalfilter.getAnimalChipID()));
        }
        if (Animalfilter.getAnimalLocation() != null && !Animalfilter.getAnimalLocation().isEmpty()) {
            predicates.add(cb.equal(root.get("animalLocation"), Animalfilter.getAnimalLocation()));
        }
        if (Animalfilter.getAnimalSize() != null && !Animalfilter.getAnimalSize().isEmpty()) {
            predicates.add(cb.equal(root.get("animalSize"), Animalfilter.getAnimalSize()));
        }
        if (Animalfilter.getIsVaccine() != null) {
            predicates.add(cb.equal(root.get("isVaccine"), Animalfilter.getIsVaccine()));
        }
        if (Animalfilter.getAnimalMemo() != null && !Animalfilter.getAnimalMemo().isEmpty()) {
            predicates.add(cb.like(root.get("animalMemo"), "%" + Animalfilter.getAnimalMemo() + "%"));
        }
        if (Animalfilter.getIsNeuter() != null) {
            predicates.add(cb.equal(root.get("isNeuter"), Animalfilter.getIsNeuter()));
        }
        if (Animalfilter.getAnimalHealth() != null && !Animalfilter.getAnimalHealth().isEmpty()) {
            predicates.add(cb.like(root.get("animalHealth"), "%" + Animalfilter.getAnimalHealth() + "%"));
        }
        
        cq.where(predicates.toArray(new Predicate[0]));
        TypedQuery<Animal> query = entityManager.createQuery(cq);
        return query.getResultList();
		
	}
	
	
	
	
//Service方法內要用的小方法
	private String generateFileName(Animal animal,String folderUrl) {
		int counter = 1;
		String baseName="userID"+animal.getMemberID()+"_"+animal.getAnimalType();
		String fileName=baseName+counter+".png";
		File checkfile;
		do {
			checkfile = new File(folderUrl, fileName);
            if (checkfile.exists()) {
                fileName = baseName + counter++ + ".png";
            }
        }while (checkfile.exists());
		
		return fileName;
	}
}
