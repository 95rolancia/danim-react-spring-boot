package com.pd.danim.Service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.PasswordRequest;
import com.pd.danim.Form.Request.ProfileRequest;
import com.pd.danim.Form.Request.UserEditRequest;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.UserRepository;

@Service
public class UserEditServiceImpl implements UserEditService {
	
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	private UserRepository userRepo;
	
				
	public String uploadProfile(ProfileRequest profileReq) {
		UUID uid = UUID.randomUUID();
		MultipartFile mpf = profileReq.getFile();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		User user = userRepo.findByNickname(profileReq.getNickname());
		String path = "src" +  File.separator + "main" +  File.separator + "resources" +  File.separator + "danim-image" + File.separator + user.getUserno();
		File file = new File(path);

		if (!file.exists()) {
			file.mkdirs();
		}

		
		
		String originalFileExtension;
		String contentType = mpf.getContentType();		
		
		
		if (ObjectUtils.isEmpty(contentType)) {
			return null;
		}


		if (contentType.contains("image/jpeg")) {
			originalFileExtension = ".jpg";
		} else if (contentType.contains("image/png")) {
			originalFileExtension = ".png";
		} else {

			return null;
		}
		
		String filename = uid.toString() + originalFileExtension;

		file = new File(absolutePath + path + File.separator + filename);
		file.setWritable(true);
		file.setReadable(true);
		try {
			mpf.transferTo(file);
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(">>>>경로 출력<<<<");
		System.out.println(absolutePath + path + File.separator + filename);
		System.out.println(file.getPath());
		System.out.println(file.getAbsolutePath());
		try {
			System.out.println(file.getCanonicalPath());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filename;		
	}
	
	
	public boolean setUserInfo(UserEditRequest userEditReq) {
		
		
		if(!danimRepo.existsById(userEditReq.getUserId())) {
			
			return false;
		}
		DanimId danim = danimRepo.findById(userEditReq.getUserId());
		User user = danim.getUser();
		
		
		
		if(!user.getNickname().equals(userEditReq.getNickname())) {
			if(userRepo.existsByNickname(userEditReq.getNickname())){
				return false;
			}
			
			user.setNickname(userEditReq.getNickname());
		}
		
		user.setIntroduce(userEditReq.getIntroduce());		
		user.setProfile(userEditReq.getProfile());
		user.setAge(userEditReq.getAge());
		user.setGender(userEditReq.getGender());
		
		userRepo.save(user);
		
		
		return true;
		
	}
	
	public boolean setPassword(PasswordRequest pwdReq) {
		
		String nickname = pwdReq.getNickname();
		
		
		if(!userRepo.existsByNickname(nickname)) {
			return false;
		}
		
		User user = userRepo.findByNickname(nickname);
		
		String password = pwdReq.getPassword();
		
		String regex = "^(?=.*\\d)(?=.*[a-zA-Z]).{8,12}$";

		if (!password.matches(regex))
			return false;
		
		DanimId danim = danimRepo.findByUser(user);
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		danim.setPassword(encoder.encode(password));
		
		danimRepo.save(danim);
		
		return true;
	}
	
	

}
