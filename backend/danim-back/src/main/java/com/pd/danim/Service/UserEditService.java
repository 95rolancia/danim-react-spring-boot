package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.Form.Request.PasswordRequest;
import com.pd.danim.Form.Request.UserEditRequest;

public interface UserEditService {

	String uploadProfile(MultipartFile file, HttpServletRequest httpServletReq);
	boolean setUserInfo(UserEditRequest userEditReq, HttpServletRequest httpServletReq);
	int setPassword(PasswordRequest pwdReq, HttpServletRequest httpServletReq);
	boolean deleteUser(HttpServletRequest httpServletReq);
}
