package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import com.pd.danim.Form.Response.UserPageResponse;

public interface UserPageService {
	UserPageResponse userPage(String nickname, HttpServletRequest httpServletReq);
}
