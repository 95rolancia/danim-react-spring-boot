package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Follow;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.StoryStatus;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Response.StoryResponse;
import com.pd.danim.Form.Response.UserPageResponse;
import com.pd.danim.Form.Response.UserSimpleResponse;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.FollowRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class UserPageServiceImpl implements UserPageService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private StoryRepository storyRepo;
	
	@Autowired
	private DanimRepository danimRepo;
	
	@Autowired
	private FollowRepository followRepo;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	
	public UserPageResponse userPage(String nickname, HttpServletRequest httpServletReq) {
		
		if(!userRepo.existsByNickname(nickname)) {
			return null;
		}
		
		
		final String requestTokenHeader = httpServletReq.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);
		
		DanimId danim = danimRepo.findById(userId);		
		
		User user = userRepo.findByNickname(nickname);
		long userno = user.getUserno();
		
		List<Story> storyList;
		List<StoryResponse> stories = new ArrayList();
		
		if(danim.getUserno() == userno)
			storyList = storyRepo.findAllByUserNo(userno);		
		else 
			storyList = storyRepo.findAllByUserNoAndStatus(userno,StoryStatus.PUBLISHED);
		
		for(Story story : storyList) {
			StoryResponse storyRes = new StoryResponse();
			storyRes.setCreatedDate(story.getCreatedDate());
			storyRes.setDuration(story.getDuration());
			storyRes.setNickname(nickname);
			storyRes.setStartDate(story.getStartDate());
			storyRes.setStatus(story.getStatus());
			storyRes.setStoryNo(story.getStoryNo());
			storyRes.setThumbnail(story.getThumbnail());
			storyRes.setTitle(story.getThumbnail());
			
			stories.add(storyRes);
		}
		
		Collections.sort(stories);
		
		
		List<Follow> tFollowList = followRepo.findAllByUser(user);
		List<Follow> tFollowedList = followRepo.findAllByFollowUserNo(userno);
		
		List<UserSimpleResponse> followingList = new ArrayList();
		List<UserSimpleResponse> followerList = new ArrayList();
		
		for(Follow follow : tFollowList) {
			UserSimpleResponse usf = new UserSimpleResponse();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followingList.add(usf);
		}
		
		for(Follow follow : tFollowedList) {
			UserSimpleResponse usf = new UserSimpleResponse();
			usf.setNickname(follow.getUser().getNickname());
			usf.setProfile(follow.getUser().getProfile());
			followerList.add(usf);
		}
		
		boolean isFollow = followRepo.existsByFollowUserNoAndUser(userno, danim.getUser());
		System.out.println("follow상태는 "+ isFollow);
		
		UserPageResponse upf = new UserPageResponse();
		
		upf.setFollowingList(followingList);		
		upf.setFollowerList(followerList);
		upf.setNickname(nickname);
		upf.setStories(stories);
		upf.setProfile(user.getProfile());
		upf.setIsFollow(isFollow);
		
		return upf;
		
	}
	
	
	
}
