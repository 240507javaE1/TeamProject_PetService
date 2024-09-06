package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "adoptorders")
public class AdoptOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int adoptID;
    
    @OneToOne
    @JoinColumn(name = "animalid")
    private Animal animalID;
    
    private String orderCreateTime;
    private String orderMemo;
    
    //foreignkey
    private int memberID;
    

  
}

