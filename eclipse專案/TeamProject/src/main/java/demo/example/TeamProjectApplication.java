package demo.example;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import demo.example.dao.*;
import demo.example.model.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@SpringBootApplication
public class TeamProjectApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TeamProjectApplication.class, args);
	}

	@Autowired
	MemberRepository memberDAO;
	@Autowired
	ServiceProductRepository serviceProductDAO;
	@Autowired
	AcceptLocationRepository acceptLocationDAO;
	@Autowired
	AcceptTimeRepository acceptTimeDAO;
	@Autowired
	AnimalRepository animalDAO;
	@Autowired
	OrderRepository orderDAO;
	@Autowired
	PetRepository petDAO;
	@Autowired
	AdoptOrdersRepository adoprOrderDAO;
	

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		// 這裡先塞進一些資料方便做測試，大家可以自己改內容

		// 會員資料
		memberDAO.save(new Member(1, "碧波", "Bobo", "456", "bobo@gmail.com", "09218666495", "新北市", "F", "1", "path"));
		memberDAO.save(new Member(2, "特比", "Tabby", "789", "bibi@gmail.com", "0958745632", "新北市", "F", "2", "path"));
		memberDAO.save(new Member(3, "王董", "wangdong", "123", "dong@gmail.com", "0921854751", "台中市", "M", "3", "path"));
		memberDAO.save(new Member(4, "林宇", "rain", "564", "rain@gmail.com", "0910545632", "台北市", "F", "1", "path"));
		memberDAO.save(new Member(5, "陳伊菲", "jackchen", "123", "jachen@gmail.com", "08000666000", "台北市", "F", "1", "path"));
		memberDAO.save(new Member(6, "蘇意宇", "kevindong", "123", "devindong@gmail.com", "0910855545", "台北市", "M", "1", "path"));
		memberDAO.save(new Member(7, "意榕", "Bobo", "456", "bobo@gmail.com", "09215666495", "新北市", "F", "1", "path"));
		memberDAO.save(new Member(8, "宥倫", "bibi", "789", "bibi@gmail.com", "095456632", "新北市", "F", "2", "path"));
		memberDAO.save(new Member(9, "廷文", "dongdong", "123", "dongdong@gmail.com", "0921854751", "台中市", "M", "3", "path"));
		memberDAO.save(new Member(10, "以榕", "miffy", "564", "miffy@gmail.com", "0910545632", "台北市", "F", "1", "path"));
		memberDAO.save(new Member(11, "伊宇", "jacksu", "123", "jacksu@gmail.com", "0800092999", "台北市", "F", "1", "path"));
		memberDAO.save(new Member(12, "momo", "momo", "123", "momo@gmail.com", "0921855545", "台北市", "M", "1", "path"));
		// 小幫手的服務資料
		serviceProductDAO.save(new ServiceProduct(1, "寵物散步", 100, 1, true));
		serviceProductDAO.save(new ServiceProduct(2, "到府照顧", 200, 1, null));
		serviceProductDAO.save(new ServiceProduct(3, "寵物美容", 300, 1, null));
		serviceProductDAO.save(new ServiceProduct(4, "到府照顧", 400, 2, null));
		serviceProductDAO.save(new ServiceProduct(5, "寵物住宿", 800, 2, null));
		serviceProductDAO.save(new ServiceProduct(6, "寵物美容", 500, 3, null));
		serviceProductDAO.save(new ServiceProduct(7, "寵物住宿", 2000, 4, null));
		

		// 小幫手的服務地區
		acceptLocationDAO.save(new AcceptLocation(1, "臺北市", "中正區", 1));
		acceptLocationDAO.save(new AcceptLocation(2, "臺北市", "中山區", 1));
		acceptLocationDAO.save(new AcceptLocation(3, "基隆市", "中正區", 2));
		acceptLocationDAO.save(new AcceptLocation(4, "基隆市", "暖暖區", 2));
		acceptLocationDAO.save(new AcceptLocation(5, "臺中市", "北區", 3));
		acceptLocationDAO.save(new AcceptLocation(6, "臺中市", "西區", 3));
		acceptLocationDAO.save(new AcceptLocation(7, "臺北市", "大同區", 1));
		acceptLocationDAO.save(new AcceptLocation(8, "新北市", "板橋區", 2));
		acceptLocationDAO.save(new AcceptLocation(9, "新北市", "板橋區", 3));
		acceptLocationDAO.save(new AcceptLocation(10, "高雄市", "三民區", 4));
		acceptLocationDAO.save(new AcceptLocation(11, "臺北市", "中山區", 2));

		// 小幫手的服務時間
		acceptTimeDAO.save(new AcceptTime(1, "2024-08-11", "2024-08-18", null, null, 1));
		acceptTimeDAO.save(new AcceptTime(2, "2024-08-11", "2024-08-11", "08:00:00", "20:00:00", 2));
		acceptTimeDAO.save(new AcceptTime(3, "2024-08-11", "2024-08-13", "08:00:00", "21:00:00", 3));
		acceptTimeDAO.save(new AcceptTime(4, "2024-08-11", "2024-08-11", "08:00:00", "20:00:00", 2));
		acceptTimeDAO.save(new AcceptTime(100, "2024-08-20", "2024-08-21", "08:00:00", "12:00:00", 1));
		acceptTimeDAO.save(new AcceptTime(101, "2024-08-15", "2024-08-31", "08:00:00", "17:00:00", 2));
		acceptTimeDAO.save(new AcceptTime(102, "2024-08-01", "2024-08-13", null, null, 3));
		acceptTimeDAO.save(new AcceptTime(103, "2024-08-16", "2024-08-31", "08:00:00", "12:00:00", 3));
		acceptTimeDAO.save(new AcceptTime(104, "2024-08-01", "2024-08-31", "09:00:00", "12:00:00", 4));

		// 動物資料
		Animal a1 = animalDAO.save(new Animal(100, "小白", "母", "狗", "1歲", "活潑", "100", "新北市", "小型", false, "很親人可愛", false, "健康",
				"1724857487334_dog2.jpg", 1));
		Animal a2 = animalDAO.save(
				new Animal(101, "小樂", "公", "兔", "2歲", "害羞", "101", "台北市", "小型", true, "是個小吃貨", true, "健康", "1724858303808_rabbit1.jpg", 2));
		Animal a3 = animalDAO.save(new Animal(102, "小黃", "母", "狗", "1歲", "活潑", "102", "基隆市", "大型", false, "有點膽小，但很乖", null, "健康",
				"1724894071835_dog1.jpg", 1));
		// Animal的Table內有個foreignKey會連接Member的Table去找"已經存在"的MemberID
		Animal a4 = animalDAO.save(new Animal(100, "小花", "母", "貓", "5歲", "安靜", "cat002", "台北市", "大型", true, "noMemo", null, "健康",
				"1724894452985_cat1.jpg", 1));
		Animal a5 = animalDAO.save(new Animal(101, "大黃", "公", "狗", "6歲", "活潑", "dog003", "基隆市", "中型", true, "noMemo", true, "健康",
				"1724939881473_dog3.jpg", 1));
		// 錯誤ex.沒有13號Member的話不能說這animal屬於memberID=3,系統去Member的Table找不到人
		// AnimalDao.save(new Animal(102,"胖胖","公","貓","7歲","","","新北市"
		// ,"小型","","noMemo",false,"/cat/img043.jpg",13));

		// 寵物資料
		petDAO.save(new Pet(1, "大白", "母", "狗", "1", "很健康", "大型", "path", 1));
		petDAO.save(new Pet(2, "大黃", "母", "貓", "2", "很胖", "小型", "path", 2));
		petDAO.save(new Pet(3, "大花", "公", "貓", "3", "拉肚子", "小型", "path", 3));
		petDAO.save(new Pet(4, "大黃", "公", "狗", "3", "很餓", "中型", "path", 4));

		// 服務訂單資料
		orderDAO.save(new Order(1, "台北市中山區66號6樓", "2024-09-01", "10:00", "memo", 1000, "未確認", LocalDateTime.now(), 1, 2, 1));
		orderDAO.save(new Order(2, "台中市豐原區88號8樓", "2024-09-02", "10:00", "memo", 2000, "未確認", LocalDateTime.now(), 2, 3, 2));
		orderDAO.save(new Order(3, "新北市板橋區168號6樓", "2024-09-03", "10:00", "memo", 3000, "未確認", LocalDateTime.now(), 3, 4, 3));
		orderDAO.save(new Order(4, "基隆市暖暖區168號7樓", "2024-09-04", "10:00", "memo", 1000, "確認", LocalDateTime.now(), 4, 1, 4));
		orderDAO.save(new Order(5, "台北市大安區99號9樓", "2024-09-05", "10:00", "memo", 2000, "拒絕", LocalDateTime.now(), 2, 1, 1));
		orderDAO.save(new Order(6, "桃園市中壢區33號3樓", "2024-09-06", "10:00", "memo", 3000, "未確認", LocalDateTime.now(), 2, 1, 2));
		
		//領養訂單資料(int adoptID,Animal animalID,String orderCreateTime,String orderMemo,int memberID)
		adoprOrderDAO.save(new AdoptOrder(1,a1,"2024-08-30","NoMeno",2));
		adoprOrderDAO.save(new AdoptOrder(2,a2,"2024-08-30","NoMeno",4));
		adoprOrderDAO.save(new AdoptOrder(3,a3,"2024-08-30","NoMeno",6));
		adoprOrderDAO.save(new AdoptOrder(4,a4,"2024-08-30","NoMeno",8));
		adoprOrderDAO.save(new AdoptOrder(5,a5,"2024-08-30","NoMeno",10));
		
	}
}
