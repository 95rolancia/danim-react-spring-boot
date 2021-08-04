package com.pd.danim.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.Dto.DanimId;
import com.pd.danim.Dto.Follow;
import com.pd.danim.Dto.FollowRequestForm;
import com.pd.danim.Dto.User;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.FollowRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class FollowServiceImpl implements FollowService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FollowRepository followRepository;

	@Autowired
	private DanimRepository danimRepository;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public boolean setFollow(FollowRequestForm followRequestForm, HttpServletRequest httpServletRequest) {

		try {
			String nickname = followRequestForm.getNickname();
			User followUser = userRepository.findByNickname(nickname);

			final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
			String id = jwtUtil.getUsername(requestTokenHeader);
			DanimId danim = danimRepository.findById(id);
			User user = danim.getUser();
						
			Follow follow = new Follow();
			follow.setFollowNo(followUser.getUserno());
			follow.setUser(user);

			followRepository.save(follow);

		} catch (Exception e) {
			return false;
		}
		return true;
	}

}
