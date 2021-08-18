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

	// 회원가입
	@Override
	public int signUpUser(SignUpRequest userForm) {
		
		
		//프론트에서 제대로 걸러지지 않아 잘못된 데이터가 넘어왔을 경우 대비
		
		//이메일 유효성 검증
		if(!checkValidityEmail(userForm.getUserId()))
			return 400;
		
		
		// 이미 등록된 이메일인 경우 
		if (danimRepo.existsById(userForm.getUserId()))
			return 409;
		
		
		//닉네임 유효성 검증
		if(!checkValidityNickname(userForm.getNickname()))
			return 400;
		
		// 회원가입 시 닉네임 중복되는 경우 (2차 검증용)
		if (userRepo.existsByNickname(userForm.getNickname())) 
			return 409;		
		
		
		//비밀번호 유효성 검증
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

	// 닉네임 유효성 검사
	@Override
	public boolean checkValidityNickname(String nickname) {
		String regex = "([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){1,11}";
		
		if (!nickname.matches(regex))
			return false;

		return true;
	}

	// 닉네임 중복 검사
	@Override
	public boolean checkNickname(String nickname) {

		if (userRepo.existsByNickname(nickname))
			return false;

		return true;
	}

	// 아이디(이메일) 유효성 검사
	@Override
	public boolean checkValidityEmail(String userId) {
		// 이메일 유효성 검사
		String regex = "[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(userId);

		if (!userId.matches(regex))
			return false;

		return true;
	}

	// 아이디(이메일) 중복 검사
	@Override
	public boolean checkDuplicateEmail(String userId) {

		if (danimRepo.existsById(userId))
			return false;

		return true;
	}

	// 인증 메일 발송
	@Override
	public boolean sendVerificationMail(String userId) {

		// 난수 생성
		Random random = new Random();
		String key = String.format("%06d", random.nextInt(1000000));

		// redis에 키 값 저장
		redisUtil.setDataExpire(userId + "mailVerify", key, 60 * 5L);

		// 메일 전송
		SMTPService.sendMail(userId, "Danim 인증 메일",
				"DANIM에 오신 걸 환영합니다! \n 다음 코드를 입력해주세요! \n 인증 코드 : " + key + "\n\n\n *본 메일을 발신 전용으로 메일을 수신할 수 없습니다");
		return true;
	}

	// 이메일 인증 번호 입력
	@Override
	public boolean verifyEmail(String key, String userId) {
		String danimId = redisUtil.getData(userId + "mailVerify");
		// 키 값이 존재하지 않거나 다른 경우
		if (danimId == null || !danimId.equals(key)) {
			return false;
		}

		// 존재하면 redis에서 기간 30분으로 증가 -> 삭제는 회원가입 시
		redisUtil.setDataExpire(userId + "mailVerify", key, 60 * 30L);

		return true;
	}
	
	
	//비밀번호 유효성 검사
	@Override
	public boolean checkValidityPassword(String password) {
		String regex = "([a-zA-Z0-9]){8,12}";

		if (!password.matches(regex))
			return false;

		return true;
	}


	
}
