package com.pd.danim.Service;

import com.pd.danim.Form.Request.PasswordRequest;
import com.pd.danim.Form.Request.ProfileRequest;
import com.pd.danim.Form.Request.UserEditRequest;

public interface UserEditService {

	String uploadProfile(ProfileRequest profileReq);
	boolean setUserInfo(UserEditRequest userEditReq);
	boolean setPassword(PasswordRequest pwdReq);
}
