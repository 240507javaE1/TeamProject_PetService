package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int OrderID;

//	private int homeCareServiceTimes;
//	private int showerServiceTimes;
//	private int walkServiceTimes;
//	private int petNannyService;
	private String orderAddress;
	private String serviceDate;
	private String serviceTime;
	private String orderMemo;
	private double total;
	private String orderStatus;
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime orderCreateDate;

	// foreignkey
	private int role1MemberID;
	// foreignkey
	private int role2MemberID;
	// foreignkey
	private int petID;

	public Order(int orderID, String orderAddress, String serviceDate, String serviceTime, String orderMemo,
			double total, String orderStatus, LocalDateTime orderCreateDate, int role1MemberID, int role2MemberID, int petID) {
		super();
		OrderID = orderID;
		this.orderAddress = orderAddress;
		this.serviceDate = serviceDate;
		this.serviceTime = serviceTime;
		this.orderMemo = orderMemo;
		this.total = total;
		this.orderStatus = orderStatus;
		this.orderCreateDate = orderCreateDate;
		this.role1MemberID = role1MemberID;
		this.role2MemberID = role2MemberID;
		this.petID = petID;
	}

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "orderID")
	private List<OrderDetail> orderDetails;

}
