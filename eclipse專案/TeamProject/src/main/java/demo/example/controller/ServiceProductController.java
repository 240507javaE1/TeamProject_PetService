package demo.example.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.hibernate.sql.exec.spi.JdbcParametersList.JdbcParametersListMulti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.AcceptLocationRepository;
import demo.example.dao.AcceptTimeRepository;
import demo.example.dao.MemberRepository;
import demo.example.dao.ServiceProductRepository;
import demo.example.model.AcceptLocation;
import demo.example.model.AcceptTime;
import demo.example.model.AcceptTimeDto;
import demo.example.model.AcceptTimeMapper;
import demo.example.model.Member;
import demo.example.model.ServiceDto;
import demo.example.model.ServiceProduct;
import jakarta.websocket.server.PathParam;

@CrossOrigin("*")
@RestController
@RequestMapping("/serviceproduct")
public class ServiceProductController {
	@Autowired
	ServiceProductRepository serviceProductDAO;
	@Autowired
	AcceptLocationRepository acceptLocationDAO;
	@Autowired
	AcceptTimeRepository acceptTimeDAO;
	@Autowired
	MemberRepository memberDAO;

	// 抓所有的
	@GetMapping
	public List<ServiceProduct> getAllServiceProduct() {
		return serviceProductDAO.findAll();
	}

	// 網址帶ID資料，給小幫手在後台修改資料用的
	@GetMapping("/{id}")
	public ServiceDto serviceManage(@PathVariable("id") int memberID) {
		// int memberID = (Integer)model.getAttribute("memberID");S
		List<ServiceProduct> products = serviceProductDAO.findByMemberID(memberID);
		List<AcceptLocation> locations = acceptLocationDAO.findByMemberID(memberID);
		List<AcceptTime> times = acceptTimeDAO.findByMemberID(memberID);
		List<AcceptTimeDto> dtoTimes = new ArrayList<>();
		for (AcceptTime a : times) {
			dtoTimes.add(AcceptTimeMapper.mapToAcceptTimeDto(a));
		}
		ServiceDto serviceDto = new ServiceDto(memberID, products, locations, dtoTimes);

		return serviceDto;
	}

	// 申請時把服務資料存進資料庫
	@PostMapping
	public ServiceDto savaServiceData(@RequestBody ServiceDto sd) {
		System.out.println(sd.getMemberID());
		System.out.println(sd.getProducts().toString());
		try {
			// 把資料新增進ServiceProduct
			for (ServiceProduct s : sd.getProducts()) {
				s.setMemberID(sd.getMemberID());
				serviceProductDAO.save(s);
			}

			// 把資料新增進AcceptLocation
			for (AcceptLocation al : sd.getLocations()) {
				al.setMemberID(sd.getMemberID());
				acceptLocationDAO.save(al);
			}

			// 把資料新增進AcceptTime
			for (AcceptTimeDto dto : sd.getTimes()) {
				AcceptTime at = AcceptTimeMapper.mapToAcceptTime(dto);
				at.setMemberID(sd.getMemberID());
				acceptTimeDAO.save(at);
			}

			// 新增成功還要把會員的權限變成2
			Member member = memberDAO.findById(sd.getMemberID()).get();
			member.setRoleLevel("2");
			memberDAO.save(member);
			System.out.println(member.toString());

			// 新增沒問題的話再把原資料丟回去
			return sd;

		} catch (Exception e) {
			// 新增有問題的話會印出錯誤訊息，並回傳null
			System.out.print("savaServiceData Error:" + e.getMessage());
			return null;
		}

	}

	// 小幫手修改服務資料
	@PutMapping
	@Transactional(rollbackFor = Exception.class)
	public ServiceDto updateServiceData(@RequestBody ServiceDto sd) {
		System.out.println(sd.toString());

		try {
			// 獲取資料庫中現有的 ServiceProduct 記錄
			List<ServiceProduct> existingProducts = serviceProductDAO.findByMemberID(sd.getMemberID());

			// 創建一個 List 來存儲修改後的 ServiceType
			List<String> updateServiceTypes = new ArrayList<>();

			// 處理需要標記為已刪除的記錄
			for (ServiceProduct existingProduct : existingProducts) {
				if (!updateServiceTypes.contains(existingProduct.getServiceType())) {
					existingProduct.setIsDeleted(true);
					serviceProductDAO.save(existingProduct);
				}
			}

			for (ServiceProduct s : sd.getProducts()) {
				// 先抓是否有符合MemberID跟Type的資料
				List<ServiceProduct> findByMemberIDAndType = serviceProductDAO
						.findByMemberIDAndServiceType(sd.getMemberID(), s.getServiceType());
				System.out.println(findByMemberIDAndType.toString());
				// 如果沒有符合的，就直接新增進資料庫
				if (findByMemberIDAndType.isEmpty()) {
					System.out.println("到findByMemberIDAndType裡面");
					s.setMemberID(sd.getMemberID());
					serviceProductDAO.save(s);
				} else {
					System.out.println("到noneDeleted裡面1");
					ServiceProduct noneDeleted = findByMemberIDAndType.stream().filter(o -> o.getIsDeleted() == null)
							.findFirst().orElse(null);
					System.out.println("到noneDeleted裡面2");
					if (noneDeleted == null) {
						System.out.println("到noneDeleted裡面3");
						// 如果有符合，但是資料庫裏面的都是delete的，也直接新增
						s.setMemberID(sd.getMemberID());
						serviceProductDAO.save(s);
					} else {
						System.out.println("到else裡面");
						System.out.println(s.toString());
						System.out.println(noneDeleted.toString());
						s.setID(noneDeleted.getID());
						s.setServiceType(noneDeleted.getServiceType());
						s.setMemberID(noneDeleted.getMemberID());
						s.setIsDeleted(noneDeleted.getIsDeleted());
						s.setOrderDetails(noneDeleted.getOrderDetails());
						System.out.println(s.toString());
						serviceProductDAO.save(s);
					}
				}
			}
			System.out.println("產品更新完成");

			// 2. 更新地點資訊
			acceptLocationDAO.deleteByMemberID(sd.getMemberID());
			for (AcceptLocation al : sd.getLocations()) {
				al.setMemberID(sd.getMemberID());
				acceptLocationDAO.save(al);
			}

			// 3. 更新時間資訊
			acceptTimeDAO.deleteByMemberID(sd.getMemberID());
			for (AcceptTimeDto dto : sd.getTimes()) {
				AcceptTime at = AcceptTimeMapper.mapToAcceptTime(dto);
				at.setMemberID(sd.getMemberID());
				acceptTimeDAO.save(at);
			}

			return sd;
		} catch (Exception e) {
			return null;
		}
	}

	@GetMapping("/search")
	public List<ServiceProduct> serchByServiceProduct(@RequestParam("serviceType") String serviceType) {
		return serviceProductDAO.findByServiceType(serviceType);
	}

	// 好像不用做刪除??

}
