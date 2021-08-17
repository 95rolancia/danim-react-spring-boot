package com.pd.danim.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
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
import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.PlaceResponse;
import com.pd.danim.Form.Response.PlanPlaceResponse;
import com.pd.danim.Form.Response.PlanResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;
import com.pd.danim.Form.Response.SearchPlanResponse;
import com.pd.danim.Form.Response.SubPlanResponse;
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
	
	
	@Override
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
	
	@Override
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
	
	@Override
	public boolean insertPlan(PlanRequest planReq, HttpServletRequest httpServletReq) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		DanimId danim = danimRepo.findById(userId);
		User user = danim.getUser();
		
		Plan plan = new Plan();
		
		LocalDateTime startDate = LocalDateTime.parse(planReq.getStartDate());
		LocalDateTime endDate = LocalDateTime.parse(planReq.getEndDate());
		
		int duration = (int)Duration.between(startDate, endDate).toDays() + 1;
		plan.setDuration(duration);
		plan.setStartDate(startDate);		
		plan.setUser(user);
		plan.setTitle(planReq.getTitle());		
		
		PlaceRequest[][] placesReq = planReq.getPlaces();
		
		List<SubPlan> subplans = new ArrayList();
		List<PlanPlace> places = new ArrayList();
		for(int i=0; i<placesReq.length; i++) {
			SubPlan subplan = new SubPlan();
			subplan.setPlan(plan);
			subplan.setSeqNo(i+1);
			for(int j=0; j<placesReq[i].length; j++) {
				PlanPlace planPlace = new PlanPlace();
				planPlace.setLatitude(placesReq[i][j].getLatitude());
				planPlace.setLongtitude(placesReq[i][j].getLongtitude());
				planPlace.setPlaceName(placesReq[i][j].getName());
				planPlace.setSeqNo(j+1);
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
	
	@Override
	public List<SearchPlanResponse> getPlans(HttpServletRequest httpServletReq){
				
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		DanimId danim = danimRepo.findById(userId);
		
		
		List<Plan> planList = planRepo.findAllByUser(danim.getUser());
		List<SearchPlanResponse> plans = new ArrayList();
		for(Plan plan : planList) {
			SearchPlanResponse planRes = new SearchPlanResponse();
			planRes.setStartDate(plan.getStartDate());
			planRes.setEndDate(plan.getStartDate().plusDays(plan.getDuration()-1));
			planRes.setPlanNo(plan.getPlanNo());
			planRes.setTitle(plan.getTitle());
			plans.add(planRes);		
		}
		
		
		return plans;
	}
	
	
	@Override
	public PlanResponse getPlan(long planNo, HttpServletRequest httpServletReq) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		DanimId danim = danimRepo.findById(userId);
		
		Plan plan = planRepo.findByPlanNo(planNo);
		
		if(plan.getUser().getUserno()!=danim.getUserno())
			return null;
						
		PlanResponse response = new PlanResponse();
		
		response.setStartDate(plan.getStartDate());
		response.setEndDate(plan.getStartDate().plusDays(plan.getDuration()-1));
		response.setTitle(plan.getTitle());
		
		List<SubPlan> subplanList = subPlanRepo.findAllByPlan(plan);
		List<SubPlanResponse> subplans = new ArrayList();
		List<PlanPlaceResponse> places;
		
		
		for(SubPlan subplan : subplanList) {
			SubPlanResponse subplanRes = new SubPlanResponse();
			List<PlanPlace> placeList = planPlaceRepo.findAllBySubplan(subplan);
			subplan.setSubplanNo(subplan.getSubplanNo());
			subplan.setSeqNo(subplan.getSeqNo());
			places = new ArrayList();
			for(PlanPlace place : placeList) {
				PlanPlaceResponse placeRes = new PlanPlaceResponse();
				placeRes.setName(place.getPlaceName());
				placeRes.setAddress(place.getAddress());
				placeRes.setSeqNo(place.getSeqNo());
				placeRes.setLatitude(place.getLatitude());
				placeRes.setLongtitude(place.getLongtitude());
				places.add(placeRes);
			}
			Collections.sort(places);
			subplanRes.setPlaces(places);
			subplans.add(subplanRes);			
		}
		
		Collections.sort(subplans);
		
		response.setSubplans(subplans);
		
		return response;
	}
	
	
	@Override
	public int putPlan(long planNo, PlanRequest planReq, HttpServletRequest httpServletReq) {
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		DanimId danim = danimRepo.findById(userId);
		User user = danim.getUser();
		
		Plan plan = planRepo.findByPlanNo(planNo);
		
			
		List<SubPlan> subplanList = subPlanRepo.findAllByPlan(plan);
		
		for(SubPlan subplan : subplanList) {
			planPlaceRepo.deleteAllBySubplan(subplan);
		}
		
		subPlanRepo.deleteAllByPlan(plan);
		
		
		
		LocalDateTime startDate = LocalDateTime.parse(planReq.getStartDate());
		LocalDateTime endDate = LocalDateTime.parse(planReq.getEndDate());
		
		int duration = (int)Duration.between(startDate, endDate).toDays() + 1;
		plan.setDuration(duration);
		plan.setStartDate(startDate);		
		plan.setUser(user);
		plan.setTitle(planReq.getTitle());		
		
		PlaceRequest[][] placesReq = planReq.getPlaces();
		
		List<SubPlan> subplans = new ArrayList();
		List<PlanPlace> places = new ArrayList();
		for(int i=0; i<placesReq.length; i++) {
			SubPlan subplan = new SubPlan();
			subplan.setPlan(plan);
			subplan.setSeqNo(i+1);
			for(int j=0; j<placesReq[i].length; j++) {
				PlanPlace planPlace = new PlanPlace();
				planPlace.setLatitude(placesReq[i][j].getLatitude());
				planPlace.setLongtitude(placesReq[i][j].getLongtitude());
				planPlace.setPlaceName(placesReq[i][j].getName());
				planPlace.setSeqNo(j+1);
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
		
		return 200;
	}
	

	@Override
	public int deletePlan(long planNo, HttpServletRequest httpServletReq) {
		
		if(!planRepo.existsById(planNo))
			return 404;
		
		Plan plan = planRepo.findByPlanNo(planNo);
		
		List<SubPlan> subplanList = subPlanRepo.findAllByPlan(plan);
		
		for(SubPlan subplan : subplanList) {
			planPlaceRepo.deleteAllBySubplan(subplan);
		}
		
		subPlanRepo.deleteAllByPlan(plan);
		
		
		
			
		planRepo.deleteById(planNo);
		
		
		return 200;
	}
	

	
	
	
	
	
}
