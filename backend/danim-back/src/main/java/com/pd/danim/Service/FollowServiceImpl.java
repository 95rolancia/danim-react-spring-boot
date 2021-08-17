package com.pd.danim.Service;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Follow;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.FollowRequest;
import com.pd.danim.Form.Request.NotificationRequest;
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
	
	@Autowired
	private NotificationService notiService;

	@Override
	public String setFollow(FollowRequest followRequestForm, HttpServletRequest httpServletRequest) {

		try {
			String nickname = followRequestForm.getNickname();
			User followUser = userRepository.findByNickname(nickname);

			final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
			String id = jwtUtil.getUsername(requestTokenHeader);
			DanimId danim = danimRepository.findById(id);
			User user = danim.getUser();

			boolean flag = false;

			if (followUser != null) {
				flag = followRepository.existsByFollowUserNoAndUser(followUser.getUserno(), user);
			}
			
			
			Optional<Follow> option = followRepository.findByFollowUserNoAndUser(followUser.getUserno(), user);
			if(!option.isPresent()) {
				Follow newFollow = new Follow();
				newFollow.setFollowUserNo(followUser.getUserno());
				newFollow.setUser(user);
				followRepository.save(newFollow);
				
				NotificationRequest request = new NotificationRequest();
				request.setToUserNickname(followUser.getNickname());
				request.setIsRead(false);
				request.setDataId(followUser.getNickname());
				request.setType("follow");
				notiService.saveNoti(request,user.getNickname());
			}
			
			if (!flag) {
				return "success";
			} else {
				return "exists";
			}
		} catch (NullPointerException e) {
			return "null";

		} catch (Exception e) {
			return "exception";
		}
	}

	@Override
	public String deleteFollow(FollowRequest followRequestForm, HttpServletRequest httpServletRequest) {
		try {
			String nickname = followRequestForm.getNickname();
			User followUser = userRepository.findByNickname(nickname);

			final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
			String id = jwtUtil.getUsername(requestTokenHeader);
			DanimId danim = danimRepository.findById(id);
			User user = danim.getUser();

			int a = -9999;
			Optional<Follow> option = followRepository.findByFollowUserNoAndUser(followUser.getUserno(), user);
			if (option.isPresent()) {
				a = followRepository.deleteByFollowUserNoAndUser(followUser.getUserno(), user);
			}

			if (a==0) {
				return "fail";
			} else {
				return "success";
			}

		} catch (NullPointerException e) {
			return "null";

		} catch (Exception e) {
			e.printStackTrace();
			return "exception";
		}
	}
}
