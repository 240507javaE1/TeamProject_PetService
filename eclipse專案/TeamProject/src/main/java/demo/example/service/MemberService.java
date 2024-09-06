package demo.example.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo.example.dao.AcceptLocationRepository;
import demo.example.dao.AcceptTimeRepository;
import demo.example.dao.MemberRepository;
import demo.example.dao.OrderRepository;
import demo.example.dao.ServiceProductRepository;
import demo.example.model.Member;
import demo.example.model.Order;
import demo.example.model.ServiceProduct;




@Service
public class MemberService{
	
	@Autowired
    private ServiceProductRepository serviceProductRepository;

    @Autowired
    private AcceptLocationRepository acceptLocationRepository;

    @Autowired
    private AcceptTimeRepository acceptTimeRepository;

    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    

//使用方法
    public List<Member> findSuitableMembers(String serviceType, String cityName, String distName,
            								String startDate, String endDate, String startTime, String endTime) {
    		return memberRepository.findSuitableMembers(serviceType, cityName, distName, startDate, endDate, startTime, endTime);
    		}
    
//搜尋服務類型、地點、時間
    public List<Member> findMembers(String serviceType, String cityName, String distName,
            String startDate, String endDate, 
            String startTime, String endTime) {
			List<Integer> serviceTypeIDs = serviceProductRepository.findMemberIDsByServiceType(serviceType);
			List<Integer> locationIDs = acceptLocationRepository.findMemberIDsByLocation(cityName, distName);
			List<Integer> timeIDs = acceptTimeRepository.findMemberIDsByTime(startDate, endDate, startTime, endTime);
			
			// 取得所有ID的交集
			serviceTypeIDs.retainAll(locationIDs);
			serviceTypeIDs.retainAll(timeIDs);
			
			if (serviceTypeIDs.isEmpty()) {
			return new ArrayList<>(); // 沒有符合的結果
			}
			
			return memberRepository.findMembersByMemberIDs(serviceTypeIDs);
			}

	
			
   
//搜尋服務類型、地點
    public List<Member> findMembersByServiceTypeAndCityName(String serviceType, String cityName,String distName) {
        List<Integer> serviceProductMemberIDs = serviceProductRepository.findMemberIDsByServiceType(serviceType);
        List<Integer> acceptLocationMemberIDs = acceptLocationRepository.findMemberIDsByLocation(cityName,distName);

        // 交集
        List<Integer> commonMemberIDs = serviceProductMemberIDs.stream()
                .filter(acceptLocationMemberIDs::contains)
                .collect(Collectors.toList());

        return memberRepository.findMembersByMemberIDs(commonMemberIDs);
    }
    



}

