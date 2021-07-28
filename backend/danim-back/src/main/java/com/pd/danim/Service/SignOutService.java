package com.pd.danim.Service;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

public interface SignOutService {
	
	void signOut(HttpServletRequest httpServletRequest);

}
