package demo.example.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import demo.example.model.Member;

public interface MemberRepository extends  JpaRepository<Member,Integer> {
	 List<Member> findByUsernameAndPassword(String username, String password);
	 @Query("SELECT m FROM Member m WHERE m.ID IN :memberIDs")
	    List<Member> findMembersByMemberIDs(@Param("memberIDs") List<Integer> memberIDs);
	 
	 //篩選服務類型、地點、時間
	 @Query("SELECT m FROM Member m JOIN m.acceptTimes at JOIN m.acceptlocation al JOIN m.serviceproduct sp " +
	           "WHERE sp.serviceType = :serviceType " +
	           "AND al.cityName = :cityName " +
	           "AND al.distName = :distName " +
	           "AND at.startDate >= :startDate " +
	           "AND at.endDate <= :endDate " +
	           "AND at.startTime >= :startTime " +
	           "AND at.endTime <= :endTime")
	    List<Member> findSuitableMembers(@Param("serviceType") String serviceType,
	                                     @Param("cityName") String cityName,
	                                     @Param("distName") String distName,
	                                     @Param("startDate") String startDate,
	                                     @Param("endDate") String endDate,
	                                     @Param("startTime") String startTime,
	                                     @Param("endTime") String endTime);
	 /*先從Order表中找到role2MemberID的值，然後根據Member表中的memberID
	  * 與這些role2MemberID匹配，最後顯示對應的Member的name*/
		Member findByMemberID(int memberID);
	
	 
	 
	 

}
