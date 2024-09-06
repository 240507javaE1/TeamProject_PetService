package demo.example.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import demo.example.model.ServiceProduct;

public interface ServiceProductRepository extends JpaRepository<ServiceProduct, Integer>{
	
	public List<ServiceProduct> findByMemberID(int id);
	
	public void deleteByMemberID(int memberID);
	
	public List<ServiceProduct> findByMemberIDAndServiceType(int memberID, String serviceType);
	
	List<ServiceProduct>findByServiceType(
			@Param("serviceType")String serviceType);
	@Query("SELECT sp.memberID FROM ServiceProduct sp WHERE sp.serviceType = :serviceType")
    List<Integer> findMemberIDsByServiceType(@Param("serviceType") String serviceType);


	
	
}
