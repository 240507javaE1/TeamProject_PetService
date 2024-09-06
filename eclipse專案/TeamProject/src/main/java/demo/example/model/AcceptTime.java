package demo.example.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "accepttime")
public class AcceptTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private String startDate;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private String endDate;
    @DateTimeFormat(pattern="HH:mm:ss")
    private String startTime;
    @DateTimeFormat(pattern="HH:mm:ss")
    private String endTime;
    
    //@ManyToOne
    //@JoinColumn(name = "memberid")
    private int memberID;
}



