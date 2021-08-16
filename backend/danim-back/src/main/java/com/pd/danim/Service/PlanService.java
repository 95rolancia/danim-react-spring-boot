package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.PlanRequest;
import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.PlanResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;
import com.pd.danim.Form.Response.SearchPlanResponse;

public interface PlanService {
	SearchPlanPlaceResponse getfindAllPlace(String keyword);
	PlaceDetailResponse getPlaceDetail(String name);
	boolean insertPlan(PlanRequest planReq, HttpServletRequest httpServletReq);
	PlanResponse getPlan(long planNo, HttpServletRequest httpServletReq);	
	int deletePlan(long planNo, HttpServletRequest httpServletReq);
	List<SearchPlanResponse> getPlans(HttpServletRequest httpServletReq);
}
