package demo.example.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
	private int memberID;
	private List<ServiceProduct> products;
    private List<AcceptLocation> locations;
    private List<AcceptTimeDto> times;

}
