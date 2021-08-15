package com.pd.danim.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;
import com.pd.danim.Service.PlanService;

@RestController
@RequestMapping("/plan")
public class PlanController {

	@Autowired
	PlanService planService;

	@GetMapping("/place/{keyword}")
	public ResponseEntity<SearchPlanPlaceResponse> searchPlaces(@PathVariable("keyword")String keyword){
			
		SearchPlanPlaceResponse response = planService.getfindAllPlace(keyword);
		
				
		return new ResponseEntity<SearchPlanPlaceResponse>(response,HttpStatus.OK);
	}
	
	@GetMapping("/place/detail/{keyword}")
	public ResponseEntity<PlaceDetailResponse> searchArea(@PathVariable("keyword")String keyword){
		
		PlaceDetailResponse response = planService.getPlaceDetail(keyword);
		
				
		return new ResponseEntity<PlaceDetailResponse>(response,HttpStatus.OK);
	}

}
