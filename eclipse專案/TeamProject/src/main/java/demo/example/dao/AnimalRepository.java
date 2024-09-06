package demo.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import demo.example.model.Animal;

public interface AnimalRepository extends JpaRepository<Animal,Integer> {
	List<Animal> findByMemberID(int memberID);
}
