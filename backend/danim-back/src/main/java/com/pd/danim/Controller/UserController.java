package com.pd.danim.Controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.SignInForm;
import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Service.LoginService;
import com.pd.danim.Service.SignUpService;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

@RestController
public class UserController {

	@Autowired
	private SignUpService signUpService;

	@Autowired
	private LoginService loginService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtil redisUtil;

	// 이메일 검사 및 메일 전송
	@PostMapping("/duplicate/email")
	public ResponseEntity<String> checkEmail(@RequestBody String userId) {

		// 유효성 검사
		if (!signUpService.checkValidityEmail(userId)) {
			return new ResponseEntity<String>("invalid", HttpStatus.OK);
		}

		// 중복 검사
		if (!signUpService.checkDuplicateEmail(userId)) {
			return new ResponseEntity<String>("duplicate", HttpStatus.OK);
		}

		// 인증 메일 전송
		signUpService.sendVerificationMail(userId);

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	// 닉네임 중복 검사
	@PostMapping("/duplicate/nickname")
	public ResponseEntity<String> checkNickname(@RequestBody String nickname) {

		if (!signUpService.checkNickname(nickname)) {
			return new ResponseEntity<String>("duplicate", HttpStatus.OK);
		}

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	// 이메일 인증
	@PostMapping("/auth/email")
	public ResponseEntity<String> verifyEmail(@RequestBody SignUpForm info) {

		if (!signUpService.verifyEmail(info.getKey(), info.getUserId())) {
			return new ResponseEntity<String>("fail", HttpStatus.OK);
		}

		return new ResponseEntity<String>("success", HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody SignUpForm signUpForm) {
		try {
			signUpService.signUpUser(signUpForm);
		} catch (Exception e) {
			System.out.println("회원 가입 에러 발생");
			e.printStackTrace();
			return new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<String>("signup-success", HttpStatus.OK);
	}

	@GetMapping("/auth/signout")
	public ResponseEntity<String> logout() {
		return new ResponseEntity<String>("signout-success", HttpStatus.OK);
	}

	@PostMapping("/auth/signin")
	public ResponseEntity<String> signIn(@RequestBody SignInForm signInForm, HttpServletRequest req,
			HttpServletResponse res) {

		try {
			DanimId danim = loginService.loginUser(signInForm.getUserId(), signInForm.getPassword());

			final String token = jwtUtil.generateToken(danim);
			final String refreshJwt = jwtUtil.generateRefreshToken(danim);
			Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
			Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
			redisUtil.setDataExpire(refreshJwt, danim.getId(), JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
			res.addCookie(accessToken);
			res.addCookie(refreshToken);

		} catch (Exception e) {
//			e.printStackTrace();
			return new ResponseEntity<String>("로그인 실패", HttpStatus.UNAUTHORIZED);
		}

		return new ResponseEntity<String>("로그인 성공", HttpStatus.OK);

	}

}
