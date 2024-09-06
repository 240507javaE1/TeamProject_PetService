package demo.example.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import demo.example.model.AcceptLocation;

public interface AcceptLocationRepository extends JpaRepository<AcceptLocation,Integer>{
	public List<AcceptLocation> findByMemberID(int id);
	
	@Query("SELECT a FROM AcceptLocation a WHERE a.cityName = :cityName AND a.distName = :distName")
    List<AcceptLocation> findByCityAndDistrict(@Param("cityName") String cityName, @Param("distName") String distName);
	
	public void deleteByMemberID(int memberID);
	@Query("SELECT al.memberID FROM AcceptLocation al WHERE al.cityName = :cityName AND al.distName = :distName")
    List<Integer> findMemberIDsByLocation(@Param("cityName") String cityName, @Param("distName") String distName);
	

	 
}
