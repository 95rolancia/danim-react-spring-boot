package com.pd.danim.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.SignUpRequest;

import javassist.NotFoundException;

public interface SignUpService {
	int signUpUser(SignUpRequest userForm);
	boolean checkNickname(String nickname);
	boolean checkDuplicateEmail(String userId);
	boolean checkValidityEmail(String userId);
	boolean sendVerificationMail(String userId);
	boolean verifyEmail(String key, String userId);
	boolean checkValidityNickname(String nickname);
	boolean checkValidityPassword(String password);
}
