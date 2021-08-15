package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.PlanRequest;
import com.pd.danim.Form.Response.PlaceDetailResponse;
import com.pd.danim.Form.Response.SearchPlanPlaceResponse;

public interface PlanService {
	SearchPlanPlaceResponse getfindAllPlace(String keyword);
	PlaceDetailResponse getPlaceDetail(String name);
	boolean insertPlan(PlanRequest planReq, HttpServletRequest httpServletReq);
	
}
