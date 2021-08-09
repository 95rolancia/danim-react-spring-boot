package com.pd.danim.Service;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pd.danim.Form.Response.SignInResponse;

public interface RefreshJwtTokenService {

	public SignInResponse refreshJwt(HttpServletRequest request, HttpServletResponse response);
}
