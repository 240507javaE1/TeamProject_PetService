package demo.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import demo.example.model.Pet;

public interface PetRepository extends JpaRepository<Pet,Integer>{
	List<Pet> findByMemberID(int memberID);

}
