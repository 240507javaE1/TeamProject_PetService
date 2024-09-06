package demo.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.example.dao.*;
import demo.example.model.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/acceplocation")
public class AccetpLocationController {

	@Autowired
	AcceptLocationRepository acceptlocationDAO;

	@GetMapping
	public List<AcceptLocation> getAllAcceptLocation() {
		return acceptlocationDAO.findAll();
	}

	@GetMapping("/search")
	public List<AcceptLocation> searchByCityAndDistrict(@RequestParam("cityName") String cityName,
			@RequestParam("distName") String distName) {
		return acceptlocationDAO.findByCityAndDistrict(cityName, distName);

	}
}
