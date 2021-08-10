package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Request.InterestRequest;

public interface InterestService {
	boolean setInterest(InterestRequest input, HttpServletRequest httpServletReq);
}
