package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int petID;
    
    private String petName;
    private String petGender;
    private String petType;
    private String petAge;
    private String petHealth;
    private String petSize;
    private String petPhoto;
    
    public Pet(int petID, String petName, String petGender, String petType, String petAge, String petHealth,
			String petSize, String petPhoto, int memberID) {
		super();
		this.petID = petID;
		this.petName = petName;
		this.petGender = petGender;
		this.petType = petType;
		this.petAge = petAge;
		this.petHealth = petHealth;
		this.petSize = petSize;
		this.petPhoto = petPhoto;
		this.memberID = memberID;
	}

	@OneToMany
    @JoinColumn(name = "petID")
    private List<Order> orders;
    
    //foreignkey
    private int memberID;
    
}

