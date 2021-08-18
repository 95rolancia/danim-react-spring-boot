package com.pd.danim.Service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.User;
import com.pd.danim.DTO.UserRole;
import com.pd.danim.Form.Request.PasswordRequest;
import com.pd.danim.Form.Request.UserEditRequest;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class UserEditServiceImpl implements UserEditService {
	
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	JwtUtil jwtUtil;
				
	public String uploadProfile(MultipartFile mpf, HttpServletRequest httpServletReq) {
		UUID uid = UUID.randomUUID();
		String absolutePath = new File("").getAbsolutePath() + File.separator;
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		
		if(danim==null) {
			return null;			
		}
		
		String path = "src" +  File.separator + "main" +  File.separator + "resources" +  File.separator + "danim-image" + File.separator + danim.getUser().getNickname();
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
			e.printStackTrace();
		}
		return filename;		
	}
	
	
	public boolean setUserInfo(UserEditRequest userEditReq, HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		
		if(danim==null) {
			return false;			
		}
		
	
		User user = danim.getUser();
		
		if(!user.getNickname().equals(userEditReq.getNickname())) {
			if(userRepo.existsByNickname(userEditReq.getNickname())){
				return false;
			}
			
			String path = "src" +  File.separator + "main" +  File.separator + "resources" +  File.separator + "danim-image" + File.separator + danim.getUser().getNickname();
			String newPath = "src" +  File.separator + "main" +  File.separator + "resources" +  File.separator + "danim-image" + File.separator + userEditReq.getNickname();
			
			File file = new File(path);
			File newFile = new File(newPath);
			
			if(!file.renameTo(newFile)) {
				return false;
			}
			user.setNickname(userEditReq.getNickname());
		}
		
		if(userEditReq.getAge() < 0 || userEditReq.getAge() > 200)
			return false;
		
		
		user.setIntroduce(userEditReq.getIntroduce());		
		user.setProfile(userEditReq.getProfile());
		user.setAge(userEditReq.getAge());
		user.setGender(userEditReq.getGender());
		
		userRepo.save(user);
		
		
		return true;
		
	}
	
	public int setPassword(PasswordRequest pwdReq, HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		
		if(danim==null) {
			return 406;			
		}
		
		
		String password = pwdReq.getPassword();
		
		String regex = "([a-zA-Z0-9]){8,12}";
		
		if (!password.matches(regex))
			return 400;

		PasswordEncoder encoder = new BCryptPasswordEncoder();		
		if(!encoder.matches(pwdReq.getLastPassword(), danim.getPassword())){
			return 409;
		}
		danim.setPassword(encoder.encode(password));
		
		danimRepo.save(danim);
		
		return 200;
	}
	
	@Override
	public boolean deleteUser(HttpServletRequest httpServletReq) {
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);
		
		User user = danim.getUser();

		user.setRole(UserRole.DELETED);
		user.setProfile("");
		
		userRepo.save(user);
		
		
		return true;
	}
	
	

}
