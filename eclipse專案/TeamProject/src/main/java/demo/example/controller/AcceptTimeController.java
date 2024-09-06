package demo.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.*;
import demo.example.model.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/acceptime")
public class AcceptTimeController {
	@Autowired
	AcceptTimeRepository acceptTimeDAO;

	@GetMapping
	public List<AcceptTime> getAllAcceptTimes() {
		return acceptTimeDAO.findAll();
	}

	@GetMapping("/search")
	public List<AcceptTime> searchByDateRange(
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyyMMdd") String startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyyMMdd") String endDate) {
		return (acceptTimeDAO).findByDateRange(startDate, startDate);
	}

	@PostMapping("/search")
	public List<AcceptTime> searchByTimeRange(
			@RequestParam("startTime") @DateTimeFormat(pattern = "HH:mm") String startTime,
			@RequestParam("endTime") @DateTimeFormat(pattern = "HH:mm") String endTime) {
		return (acceptTimeDAO).findByTimeRange(startTime, startTime);
	}

}
