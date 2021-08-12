package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.LoveRequest;

public interface LoveService {
	
	
	public String addLove(LoveRequest loveRequest, HttpServletRequest request);
	public String deleteLove(LoveRequest loveRequest, HttpServletRequest request);
	

}
