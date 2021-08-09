package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.FollowRequest;

public interface FollowService {
	
	public boolean setFollow(FollowRequest followRequestForm, HttpServletRequest httpServletRequest);

}
