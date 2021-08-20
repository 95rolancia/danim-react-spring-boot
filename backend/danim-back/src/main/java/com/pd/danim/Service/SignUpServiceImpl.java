package com.pd.danim.Service;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.SignUpRequest;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.RedisUtil;

@Service
public class SignUpServiceImpl implements SignUpService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private DanimRepository danimRepo;

	@Autowired
	private RedisUtil redisUtil;

	@Autowired
	private SMTPService SMTPService;

	@Override
	public int signUpUser(SignUpRequest userForm) {
		
		
		
		if(!checkValidityEmail(userForm.getUserId()))
			return 400;
		
		
		if (danimRepo.existsById(userForm.getUserId()))
			return 409;
		
		
		if(!checkValidityNickname(userForm.getNickname()))
			return 400;
		
		if (userRepo.existsByNickname(userForm.getNickname())) 
			return 409;		
		
		
		if(!checkValidityPassword(userForm.getPassword()))
			return 400;
		
		
		if(!verifyEmail(userForm.getKey(),userForm.getUserId()))
			return 403;
		
		if(userForm.getAge() < 1 || userForm.getAge() >200)
			return 400;
		

		User user = new User();
		user.setNickname(userForm.getNickname());
		user.setAge(userForm.getAge());
		user.setGender(userForm.getGender());
		userRepo.save(user);

		DanimId danim = new DanimId();

		PasswordEncoder encoder = new BCryptPasswordEncoder();
		
		danim.setPassword(encoder.encode(userForm.getPassword()));
		danim.setId(userForm.getUserId());
		danim.setUser(user);
		danimRepo.save(danim);
		redisUtil.deleteData(userForm.getUserId() + "mailVerify");
		
		return 200;
	

	};

	@Override
	public boolean checkValidityNickname(String nickname) {
		String regex = "([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){1,11}";
		
		if (!nickname.matches(regex))
			return false;

		return true;
	}

	@Override
	public boolean checkNickname(String nickname) {

		if (userRepo.existsByNickname(nickname))
			return false;

		return true;
	}

	@Override
	public boolean checkValidityEmail(String userId) {
		String regex = "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(userId);

		if (!userId.matches(regex))
			return false;

		return true;
	}

	@Override
	public boolean checkDuplicateEmail(String userId) {

		if (danimRepo.existsById(userId))
			return false;

		return true;
	}

	@Override
	public boolean sendVerificationMail(String userId) {

		Random random = new Random();
		String key = String.format("%06d", random.nextInt(1000000));

		redisUtil.setDataExpire(userId + "mailVerify", key, 60 * 5L);

		SMTPService.sendMail(userId, "Danim 인증 메일",
				"DANIM에 오신 걸 환영합니다! \n 다음 코드를 입력해주세요! \n 인증 코드 : " + key + "\n\n\n *본 메일을 발신 전용으로 메일을 수신할 수 없습니다");
		return true;
	}

	@Override
	public boolean verifyEmail(String key, String userId) {
		String danimId = redisUtil.getData(userId + "mailVerify");
		if (danimId == null || !danimId.equals(key)) {
			return false;
		}

		redisUtil.setDataExpire(userId + "mailVerify", key, 60 * 30L);

		return true;
	}
	
	
	@Override
	public boolean checkValidityPassword(String password) {
		String regex = "([a-zA-Z0-9]){8,12}";

		if (!password.matches(regex))
			return false;

		return true;
	}


	
}
