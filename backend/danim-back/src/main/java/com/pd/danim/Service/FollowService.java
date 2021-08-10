package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.FollowRequest;

public interface FollowService {
	
	public String setFollow(FollowRequest followRequestForm, HttpServletRequest httpServletRequest);
	public String deleteFollow(FollowRequest followRequestForm, HttpServletRequest httpServletRequest);

}
