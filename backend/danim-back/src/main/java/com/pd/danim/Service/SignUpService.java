package com.pd.danim.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Dto.User;

import javassist.NotFoundException;

public interface SignUpService {
	int signUpUser(SignUpForm userForm);
	boolean checkNickname(String nickname);
	boolean checkDuplicateEmail(String userId);
	boolean checkValidityEmail(String userId);
	boolean sendVerificationMail(String userId);
	boolean verifyEmail(String key, String userId);
	boolean checkValidityNickname(String nickname);
	boolean checkValidityPassword(String password);
}
