package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Dto.FollowRequestForm;

public interface FollowService {
	
	public boolean setFollow(FollowRequestForm followRequestForm, HttpServletRequest httpServletRequest);

}
