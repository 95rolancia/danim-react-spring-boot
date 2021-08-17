package com.pd.danim.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Form.Request.PlanRequest;
import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.PlanResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;
import com.pd.danim.Form.Response.SearchPlanResponse;
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
	public ResponseEntity<PlaceDetailResponse> searchPlaceDetail(@PathVariable("keyword")String keyword){
		
		PlaceDetailResponse response = planService.getPlaceDetail(keyword);
		
				
		return new ResponseEntity<PlaceDetailResponse>(response,HttpStatus.OK);
	}
	
	
	@GetMapping
	public ResponseEntity<List<SearchPlanResponse>> getPlans(HttpServletRequest httpServletReq){
		
		
		List<SearchPlanResponse> response = planService.getPlans(httpServletReq);
				
		return new ResponseEntity<List<SearchPlanResponse>>(response,HttpStatus.OK);
	}
	
	
	@PostMapping
	public ResponseEntity<String> writePlan(@RequestBody PlanRequest planReq, HttpServletRequest httpServletReq){
		
				
		if(!planService.insertPlan(planReq, httpServletReq)) {
			return new ResponseEntity<String>("FAIL",HttpStatus.BAD_REQUEST);
		}
				
				
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}
	
	@GetMapping("/{planNo}")
	public ResponseEntity<PlanResponse> getPlan(@PathVariable("planNo") long planNo, HttpServletRequest httpServletReq){
		
		
		PlanResponse planRes = planService.getPlan(planNo, httpServletReq);
		
		
		
		return new ResponseEntity<PlanResponse>(planRes,HttpStatus.OK);
	}
	
	
	@PutMapping("/{planNo}")
	public ResponseEntity<String> putPlan(@PathVariable("planNo") long planNo,@RequestBody PlanRequest planReq, HttpServletRequest httpServletReq){
		
		
		int response = planService.putPlan(planNo, planReq, httpServletReq);
		
		
		
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
	
	@DeleteMapping("/{planNo}")
	public ResponseEntity<String> deletePlan(@PathVariable("planNo") long planNo, HttpServletRequest httpServletReq){
		
		
		int response = planService.deletePlan(planNo, httpServletReq);
		
		
		
		return new ResponseEntity<String>("SUCCESS",HttpStatus.OK);
	}

	
}
