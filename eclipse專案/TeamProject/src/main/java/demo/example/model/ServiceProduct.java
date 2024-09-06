package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "serviceproduct")
public class ServiceProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;

    private String serviceType;
    private int price;
    
    //foreignkey
    private int memberID;
    
    private Boolean isDeleted;
    

	public ServiceProduct(int iD, String serviceType, int price, int memberID, Boolean isDeleted) {
		super();
		ID = iD;
		this.serviceType = serviceType;
		this.price = price;
		this.memberID = memberID;
		this.isDeleted = isDeleted;
	}

	@OneToMany
    @JoinColumn(name = "serviceproductID")
    private List<OrderDetail> orderDetails; // This establishes the one-to-many relationship
}

