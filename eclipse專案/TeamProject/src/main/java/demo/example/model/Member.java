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
@Table(name = "members")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int memberID;
	private String name;
	private String username;
	private String password;
	private String email;
	private String phone;
	private String address;
	private String gender;
	private String roleLevel;
	private String memberPhoto;

	public Member(int memberID, String name, String username, String password, String email, String phone,
			String address, String gender, String roleLevel, String memberPhoto) {
		super();
		this.memberID = memberID;
		this.name = name;
		this.username = username;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.gender = gender;
		this.roleLevel = roleLevel;
		this.memberPhoto = memberPhoto;
	}

// mappedBy refers to the variable in 
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<AcceptTime> acceptTimes;
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<AcceptLocation> acceptlocation;
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<AdoptOrder> adoptorders;
	@OneToMany
	@JoinColumn(name = "role1MemberID")
	private List<Order> role1MemberID;
	@OneToMany
	@JoinColumn(name = "role2MemberID")
	private List<Order> role2MemberID;
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<Animal> animal;
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<ServiceProduct> serviceproduct;
	@OneToMany
	@JoinColumn(name = "memberID")
	private List<Pet> pet;

}
