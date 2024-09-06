package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "animals")
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int animalID;
	private String animalName;
	private String animalGender;
	private String animalType;
	private String animalAge;
	private String animalPersonality;
	private String animalChipID;
	private String animalLocation;
	private String animalSize;
	private Boolean isVaccine;
	private String animalMemo;
	private Boolean isNeuter;
	private String animalHealth;

	// @Lob
	// @Column(name = "animalphoto", length = Integer.MAX_VALUE, nullable = true)
	
	private String animalPhoto;

	// foreignkey
	private int memberID;

	public Animal(int animalID, String animalName, String animalGender, String animalType, String animalAge,
			String animalPersonality, String animalChipID, String animalLocation, String animalSize, Boolean isVaccine,
			String animalMemo, Boolean isNeuter, String animalHealth, String animalPhoto, int memberID) {
		super();
		this.animalID = animalID;
		this.animalName = animalName;
		this.animalGender = animalGender;
		this.animalType = animalType;
		this.animalAge = animalAge;
		this.animalPersonality = animalPersonality;
		this.animalChipID = animalChipID;
		this.animalLocation = animalLocation;
		this.animalSize = animalSize;
		this.isVaccine = isVaccine;
		this.animalMemo = animalMemo;
		this.isNeuter = isNeuter;
		this.animalHealth = animalHealth;
		this.animalPhoto = animalPhoto;
		this.memberID = memberID;
	}

// Optional: Define the relationship from the Animals side
	@OneToOne(mappedBy = "animalID")
	@JsonIgnore
	private AdoptOrder adoptOrder;

}
