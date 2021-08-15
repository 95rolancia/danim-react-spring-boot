package com.pd.danim.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Place;
import com.pd.danim.DTO.Plan;
import com.pd.danim.DTO.PlanPlace;
import com.pd.danim.DTO.SubPlan;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.BestRouteRequest;
import com.pd.danim.Form.Request.PlaceRequest;
import com.pd.danim.Form.Request.PlanRequest;
import com.pd.danim.Form.Request.SubplanRequest;
import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.PlaceResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.PlaceRepository;
import com.pd.danim.Repository.PlanPlaceRepository;
import com.pd.danim.Repository.PlanRepository;
import com.pd.danim.Repository.SubPlanRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class PlanServiceImpl implements PlanService {
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	private PlanRepository planRepo;
	
	@Autowired
	private SubPlanRepository subPlanRepo;
	
	@Autowired
	private PlanPlaceRepository planPlaceRepo; 
	
	@Autowired
	private PlaceRepository placeRepo;
	
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	
	public SearchPlanPlaceResponse getfindAllPlace(String keyword) {
		List<Place> placeList = placeRepo.findAllByNameContaining(keyword);
		List<PlaceResponse> places = new ArrayList();
		SearchPlanPlaceResponse response = new SearchPlanPlaceResponse();
		
		for(Place place : placeList) {
			PlaceResponse placeRes = new PlaceResponse();
			placeRes.setAddress(place.getAddress());
			placeRes.setName(place.getName());
			placeRes.setType(place.getType());
			
			places.add(placeRes);
		}
		
		response.setPlaces(places);
		
		return response;
	}
	
	public PlaceDetailResponse getPlaceDetail(String name) {

		Place place = placeRepo.findByName(name); 
		
		PlaceDetailResponse response = new PlaceDetailResponse();
		
		response.setAddress(place.getAddress());
		response.setFilename(place.getFilename());
		response.setLatitude(place.getLatitude());
		response.setLongtitude(place.getLongtitude());
		response.setName(place.getName());
		response.setType(place.getType());		
		
		return response;
		
	}
	
	
	public boolean insertPlan(PlanRequest planReq, HttpServletRequest httpServletReq) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		DanimId danim = danimRepo.findById(userId);
		User user = danim.getUser();
		
		Plan plan = new Plan();
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy:MM:dd HH:mm:ss");
		LocalDateTime startDate = LocalDateTime.parse(planReq.getStartDate());
		LocalDateTime endDate = LocalDateTime.parse(planReq.getEndDate());
		
		int duration = (int)Duration.between(startDate, endDate).toDays() + 1;
		plan.setDuration(duration);
		plan.setStartDate(startDate);		
		plan.setUser(user);
		
		List<SubPlan> subplans = new ArrayList();
		List<PlanPlace> places = new ArrayList();
		for(SubplanRequest subplanReq : planReq.getSubplans()) {
			SubPlan subplan = new SubPlan();
			subplan.setPlan(plan);
			subplan.setSeqNo(subplanReq.getSeqNo());
			for(PlaceRequest placeReq : subplanReq.getPlaces()) {
				PlanPlace planPlace = new PlanPlace();
				planPlace.setLatitude(placeReq.getLatitude());
				planPlace.setLongtitude(placeReq.getLongtitude());
				planPlace.setPlaceName(placeReq.getName());
				planPlace.setSeqNo(placeReq.getSeqNo());
				planPlace.setSubplan(subplan);
				places.add(planPlace);
			}
			
			subplans.add(subplan);			
		}
		
		planRepo.save(plan);
		
		for(SubPlan subplan : subplans) {
			subPlanRepo.save(subplan);
		}
		
		for(PlanPlace place : places) {
			planPlaceRepo.save(place);
		}
		
		
		return true;
		
	}
	

	
	
	public void getBestRoute(BestRouteRequest bestRouteReq) {

	}
	
	
}
