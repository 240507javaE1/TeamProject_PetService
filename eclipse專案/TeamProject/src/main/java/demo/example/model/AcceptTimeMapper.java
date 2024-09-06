package demo.example.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class AcceptTimeMapper {
//	public static void main(String[] args) {
//		String start = "2024-08-14T08:00:00";
//	    String end = "2024-08-15T12:00:00";
//		AcceptTimeDto dto = new AcceptTimeDto(start, end);
//		
//	    List<AcceptTime> result = mapToAcceptTime(dto);
//	    
//	    for (AcceptTime slot : result) {
//	        System.out.println(slot);
//	    }
//	}

	// 把AcceptTimeDto轉換成AcceptTime
	public static AcceptTime mapToAcceptTime(AcceptTimeDto dto) {
		AcceptTime acceptTime = new AcceptTime();

		if (dto.getStart().length() == 10) { // 假設日期是 "yyyy-MM-dd" 格式，表示沒有時間部分
			acceptTime.setStartDate(dto.getStart());
			acceptTime.setEndDate(dto.getEnd());
		} else {
			String[] starts = dto.getStart().split("T");
			String[] ends = dto.getEnd().split("T");
			acceptTime.setStartDate(starts[0]);
			acceptTime.setStartTime(starts[1]);
			acceptTime.setEndDate(ends[0]);
			acceptTime.setEndTime(ends[1]);
		}

		return acceptTime;
	}
	
	// 把AcceptTime轉換成AcceptTimeDto
		public static AcceptTimeDto mapToAcceptTimeDto(AcceptTime at) {
			AcceptTimeDto dto = new AcceptTimeDto();
			if(at.getEndTime()==null && at.getStartTime()==null) {
				dto.setStart(at.getStartDate());
				dto.setEnd(at.getEndDate());
			}else {
				dto.setStart(at.getStartDate()+"T"+at.getStartTime());
				dto.setEnd(at.getEndDate()+"T"+at.getEndTime());
			}
			
			
			return dto;
		}

}
