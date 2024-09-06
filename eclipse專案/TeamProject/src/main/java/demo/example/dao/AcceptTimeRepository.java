package demo.example.dao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import demo.example.model.AcceptTime;

public interface AcceptTimeRepository extends JpaRepository<AcceptTime,Integer>{
	public List<AcceptTime> findByMemberID(int id);
	
	public void deleteByMemberID(int memberID);
	
	@Query("SELECT a FROM AcceptTime a WHERE :startDate <= a.endDate AND :endDate >= a.startDate")
	List<AcceptTime>findByDateRange(@Param("startDate")String startDate,@Param("endDate")String endDate);
	
	@Query("SELECT b FROM AcceptTime b WHERE :startTime <= b.endTime AND :endTime >= b.startTime")
	List<AcceptTime>findByTimeRange(@Param("startTime")String startTime,@Param("endTime")String endTime);
	
	@Query("SELECT at.memberID FROM AcceptTime at " +
		       "WHERE :startDate BETWEEN at.startDate AND at.endDate " +
		       "AND :endDate BETWEEN at.startDate AND at.endDate " +
		       "AND (:startTime IS NULL OR :endTime IS NULL OR " +
		       "(:startTime BETWEEN at.startTime AND at.endTime AND :endTime BETWEEN at.startTime AND at.endTime))")
		List<Integer> findMemberIDsByTime(
		    @Param("startDate") String startDate,
		    @Param("endDate") String endDate,
		    @Param("startTime") String startTime,
		    @Param("endTime") String endTime);

}
