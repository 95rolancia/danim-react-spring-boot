package com.pd.danim.Service;

import java.util.UUID;

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
	
	@Override
	public boolean signUpUser(SignUpForm userForm) {
		if(!danimRepo.existsById(userForm.getUserId())) {
			
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
			
			//sendVerificationMail(danim);
			
			return true;
		}else 
			return false;
		
		
		
	};
	
	
	@Override
    public void sendVerificationMail(DanimId danimId) {
        String VERIFICATION_LINK = "http://localhost:8080/user/verify/";
        UUID uuid = UUID.randomUUID();
        redisUtil.setDataExpire(uuid.toString(),Long.toString(danimId.getUserno()), 60 * 30L);
        SMTPService.sendMail(danimId.getId(),"회원가입 인증메일입니다.",VERIFICATION_LINK+uuid.toString());
    }
	
	
	
}
