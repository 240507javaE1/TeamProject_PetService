package demo.example.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import demo.example.model.AdoptOrder;

public interface AdoptOrdersRepository extends JpaRepository<AdoptOrder, Integer>{

}
