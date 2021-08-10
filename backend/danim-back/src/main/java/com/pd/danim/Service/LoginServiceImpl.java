package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Response.MeResponse;
import com.pd.danim.Form.Response.SignInResponse;
import com.pd.danim.Form.Response.StoryResponse;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.CookieUtil;
import com.pd.danim.Util.JwtUtil;
import com.pd.danim.Util.RedisUtil;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private CookieUtil cookieUtil;
	
	@Autowired
	private RedisUtil redisUtil;

	@Autowired
	private DanimRepository danimRepository;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StoryRepository storyRepo;

	@Override
	public DanimId loginUser(String id, String password) throws Exception {

		DanimId danim = danimRepository.findById(id);
		
		if (danim == null) {
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!encoder.matches(password, danim.getPassword())) {
			throw new Exception("회원이  아니거나 비밀번호가 틀렸습니다.");
		}
		return danim;
	}
	
	
	@Override
	public MeResponse getUserInfo(HttpServletRequest httpServletRequest) {
		
		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String id = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepository.findById(id);		
		User user = danim.getUser();		
		MeResponse me =  new MeResponse();
		
		List<StoryResponse> stories = new ArrayList();
		List<Story>storyList = storyRepo.findAllByUserNo(user.getUserno());
		
		for(Story story : storyList) {
			StoryResponse storyRes = new StoryResponse();
			storyRes.setCreatedDate(story.getCreatedDate());
			storyRes.setDuration(story.getDuration());
			storyRes.setStartDate(story.getStartDate());
			storyRes.setStoryNo(story.getStoryNo());
			storyRes.setThumbnail(story.getThumbnail());
			storyRes.setTitle(story.getTitle());
			stories.add(storyRes);
		}
		
		List<Interest>interests = user.getInterests();
		String areas[] = new String[interests.size()];
		
		for(int i=0;i<areas.length;i++) {
			areas[i] = interests.get(i).getArea();
		}
		
		me.setUserId(danim.getId());
		me.setNickname(user.getNickname());
		me.setAge(user.getAge());
		me.setGender(user.getGender());
		me.setIntroduce(user.getIntroduce());
		me.setProfile(user.getProfile());
		me.setRole(user.getRole());
		me.setStories(stories);
		me.setAreas(areas);		
		
		return me;
		
	}

	@Override
	public SignInResponse generateResponse(HttpServletResponse httpServletResponse, DanimId danim) {
		
		SignInResponse signInResponse = new SignInResponse();
		
		final String token = jwtUtil.generateToken(danim);
		final String refreshJwt = jwtUtil.generateRefreshToken(danim);
		Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token);
		Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt);
		redisUtil.setDataExpire(danim.getId()+"jwt", refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
		httpServletResponse.addCookie(refreshToken);
		signInResponse.setAccessToken(accessToken.getValue());
		
		Collection<String> headers = httpServletResponse.getHeaders(HttpHeaders.SET_COOKIE);
		for (String header : headers) {
			httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, header+"; " + "SameSite=None; Secure");
		}
		
		return signInResponse;
		
	}

}
