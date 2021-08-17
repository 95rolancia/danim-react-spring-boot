package com.pd.danim.Service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Love;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.LoveRequest;
import com.pd.danim.Form.Request.NotificationRequest;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.LoveRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class LoveServiceImpl implements LoveService {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private DanimRepository danimRepository;

	@Autowired
	private StoryRepository storyRepository;

	@Autowired
	private LoveRepository loveRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private NotificationService notiService;

	@Override
	public String addLove(LoveRequest loveRequest, HttpServletRequest request) {

		try {

			final String requestTokenHeader = request.getHeader("Authorization");
			String userId = jwtUtil.getUsername(requestTokenHeader);

			DanimId danim = danimRepository.findById(userId);
			User user = danim.getUser();

			long storyNo = Long.parseLong(loveRequest.getStoryNo());

			Story story = storyRepository.findByStoryNo(storyNo);
			
			User LoveUser = userRepository.findByUserno(story.getUserNo());

			boolean flag = loveRepository.existsByUserAndStory(user, story);
			if (!flag) {
				Love newLove = new Love();
				newLove.setUser(user);
				newLove.setStory(story);
				loveRepository.save(newLove);

				story.setLoveCount(story.getLoveCount() + 1);
				storyRepository.save(story);
				
				NotificationRequest notificationRequest = new NotificationRequest();
				notificationRequest.setToUserNickname(LoveUser.getNickname());
				notificationRequest.setIsRead(false);
				notificationRequest.setDataId(story.getTitle());
				notificationRequest.setType("love");
				notiService.saveNoti(notificationRequest,user.getNickname());

				return "success";
			} else {
				return "doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
	}

	@Override
	public String deleteLove(LoveRequest loveRequest, HttpServletRequest request) {

		try {

			final String requestTokenHeader = request.getHeader("Authorization");
			String userId = jwtUtil.getUsername(requestTokenHeader);

			DanimId danim = danimRepository.findById(userId);
			User user = danim.getUser();

			long storyNo = Long.parseLong(loveRequest.getStoryNo());

			Story story = storyRepository.findByStoryNo(storyNo);

			int flag = -9999;

			flag = loveRepository.deleteByUserAndStory(user, story);
			
			if (flag==1) {
				story.setLoveCount(story.getLoveCount() -1);
				storyRepository.save(story);
				return "success";
			} else {
				return "doesn't exist";
			}
		} catch (Exception e) {
			return "fail";
		}

	}

}
