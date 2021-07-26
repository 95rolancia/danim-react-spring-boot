package com.pd.danim.Service;

import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.SignUpForm;
import com.pd.danim.Dto.User;
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
	SMTPService SMTPService;
	

		
	//회원가입
	@Override
	public boolean signUpUser(SignUpForm userForm) {
		if(!danimRepo.existsById(userForm.getUserId())) {
			
			
			//회원가입 시 닉네임 중복되는 경우 (2차 검증용)
			if(userRepo.existsByNickname(userForm.getNickname())) {
				
				return false;
			}
			
			
			User user = new User();
			user.setNickname(userForm.getNickname());
			user.setAge(userForm.getAge());
			user.setGender(userForm.getGender());		
			userRepo.save(user);
			
			
			
			DanimId danim = new DanimId();
			
			danim.setPassword(userForm.getPassword());
			danim.setId(userForm.getUserId());
			danim.setUser(user);
			danimRepo.save(danim);
			
			return true;
		}
		
		
			return false;
		
		
		
	};
	
	
	//닉네임 중복 검사
	public boolean checkNickname(String nickname) {
		if(userRepo.existsByNickname(nickname))
			return false;
		
		return true;
	}
	
	
	//아이디(이메일) 유효성 검사
	@Override
	public boolean checkValidityEmail(String userId) {		
		//이메일 유효성 검사
		String regex = "^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\\w+\\.)+\\w+$";
		Pattern p = Pattern.compile(regex);
		Matcher m = p.matcher(userId);
		if(!m.matches())
			return false;
		
		return true;
	}
	
	
	//아이디(이메일) 중복 검사
	@Override
	public boolean checkDuplicateEmail(String userId) {
		
		if(danimRepo.existsById(userId))		
			return false;
		
		return true;
	}
	
	//인증 메일 발송
	@Override
    public boolean sendVerificationMail(String userId) {
		
		//난수 생성
		Random random = new Random();
		String key = String.format("%06d",random.nextInt(1000000));
    
        
        //redis에 키 값 저장
        redisUtil.setDataExpire(userId,key, 60 * 5L);
        
        //메일 전송
        SMTPService.sendMail(userId,"Danim 인증 메일","DANIM에 오신 걸 환영합니다! \n 다음 코드를 입력해주세요! \n 인증 코드 : "+key+"\n\n\n *본 메일을 발신 전용으로 메일을 수신할 수 없습니다");
        return true;	
    }

	//이메일 인증 번호 입력
	@Override
	public boolean verifyEmail(String key, String userId) {
		String danimId = redisUtil.getData(userId);
		//키 값이 존재하지 않거나 다른 경우
		if(danimId == null || !danimId.equals(key)) {
			return false;
		}
		
		//존재하면 redis에서 키 값 삭제
		redisUtil.deleteData(userId);
		return true;
	}



	
	
	
}
