package com.pd.danim.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

import javax.lang.model.type.IntersectionType;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.pd.danim.DTO.DanimId;
import com.pd.danim.DTO.Interest;
import com.pd.danim.DTO.Photo;
import com.pd.danim.DTO.Story;
import com.pd.danim.DTO.StoryStatus;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Response.MyPopularPhotoResponse;
import com.pd.danim.Form.Response.MyPopularResponse;
import com.pd.danim.Form.Response.StoryResponse;
import com.pd.danim.Repository.DanimRepository;
import com.pd.danim.Repository.PhotoRepository;
import com.pd.danim.Repository.StoryRepository;
import com.pd.danim.Repository.UserRepository;
import com.pd.danim.Util.JwtUtil;

@Service
public class HomeServiceImpl implements HomeService {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private DanimRepository danimRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PhotoRepository photoRepository;

	@Autowired
	private StoryRepository storyRepository;

	@Override
	public List<MyPopularResponse> getMyPopularStory(HttpServletRequest httpServletRequest) {

		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);

		DanimId danim = danimRepository.findById(userId);
		User user = danim.getUser();

		List<Interest> interests = user.getInterests();
//		Map<String,List<StoryResponse>> storyResponses = new HashMap<String,List<StoryResponse>>();

		List<MyPopularResponse> myPopularResponses = new ArrayList<MyPopularResponse>();
		for (Interest interest : interests) {

			MyPopularResponse myPopularResponse = new MyPopularResponse();

			if (interest.getArea().equals("전라남")) {
				myPopularResponse.setArea("전남");
			} else if (interest.getArea().equals("전라북")) {
				myPopularResponse.setArea("전북");
			} else if (interest.getArea().equals("경상북")) {
				myPopularResponse.setArea("경북");
			} else if (interest.getArea().equals("경상남")) {
				myPopularResponse.setArea("경남");
			} else if (interest.getArea().equals("충청북")) {
				myPopularResponse.setArea("충북");
			} else if (interest.getArea().equals("충청남")) {
				myPopularResponse.setArea("충남");
			} else {
				myPopularResponse.setArea(interest.getArea());
			}

			List<Photo> photos = photoRepository.findAllByAddressContaining(interest.getArea());
			List<Story> stories = new ArrayList<Story>();

//			PriorityQueue<Story> pq = new PriorityQueue<Story>(new Comparator<Story>() {
//
//				@Override
//				public int compare(Story o1, Story o2) {
//					if (o1.getLoveCount() >= o2.getLoveCount()) {
//						return 1;
//					} else {
//						return -1;
//					}
//				}
//			});
//			
//
//
//			for (Photo photo : photos) {
//				pq.add(photo.getStory());
//			}
//
//			if (pq.size() < 10) {
//				for (int i = 0; i < pq.size(); i++) {
//					stories.add(pq.poll());
//				}
//			} else {
//				for (int i = 0; i < 10; i++) {
//					stories.add(pq.poll());
//				}
//			}

			Set<Long> storySet = new HashSet<Long>();
			for (Photo photo : photos) {
				storySet.add(photo.getStory().getStoryNo());
				if (storySet.size() >= 10) {
					break;
				}
			}

			Iterator<Long> iter = storySet.iterator();
			while (iter.hasNext()) {
				Story story = storyRepository.findByStoryNo(iter.next());
				stories.add(story);
			}

			Collections.sort(stories, new Comparator<Story>() {
				@Override
				public int compare(Story o1, Story o2) {
					if (o1.getLoveCount() >= o2.getLoveCount()) {
						return 1;
					} else {
						return -1;
					}
				}
			});

			List<StoryResponse> responses = new ArrayList<StoryResponse>();

			for (Story story : stories) {

				if (story.getStatus().equals(StoryStatus.PUBLISHED)) {
					StoryResponse storyResponse = new StoryResponse();
					storyResponse.setStoryNo(story.getStoryNo());
					User storyUser = userRepository.findByUserno(story.getUserNo());
					storyResponse.setNickname(storyUser.getNickname());
					storyResponse.setTitle(story.getTitle());
					storyResponse.setThumbnail(story.getThumbnail());
					storyResponse.setStartDate(story.getStartDate());
					storyResponse.setCreatedDate(story.getCreatedDate());
					storyResponse.setDuration(story.getDuration());
					storyResponse.setStatus(story.getStatus());
					responses.add(storyResponse);
				}

			}

			myPopularResponse.setStories(responses);
			myPopularResponses.add(myPopularResponse);
		}

		return myPopularResponses;
	}

	@Override
	public List<StoryResponse> getPopularStory() {

		List<Story> stories = storyRepository.findTop10ByOrderByLoveCountDesc();
		List<StoryResponse> responses = new ArrayList<StoryResponse>();
		for (Story story : stories) {
			if (story.getStatus().equals(StoryStatus.PUBLISHED)) {
				StoryResponse storyResponse = new StoryResponse();
				storyResponse.setStoryNo(story.getStoryNo());
				User storyUser = userRepository.findByUserno(story.getUserNo());
				storyResponse.setNickname(storyUser.getNickname());
				storyResponse.setTitle(story.getTitle());
				storyResponse.setThumbnail(story.getThumbnail());
				storyResponse.setStartDate(story.getStartDate());
				storyResponse.setCreatedDate(story.getCreatedDate());
				storyResponse.setDuration(story.getDuration());
				storyResponse.setStatus(story.getStatus());

				responses.add(storyResponse);
			}
		}
		return responses;
	}

	@Override
	public List<MyPopularPhotoResponse> getMyPopularPhoto(HttpServletRequest httpServletRequest) {

		final String requestTokenHeader = httpServletRequest.getHeader("Authorization");
		String userId = jwtUtil.getUsername(requestTokenHeader);

		DanimId danim = danimRepository.findById(userId);
		User user = danim.getUser();

		List<Interest> interests = user.getInterests();
		Sort sort = sortByDate();
		List<MyPopularPhotoResponse> responses = new ArrayList<>();

		for (Interest interest : interests) {

			List<Photo> photos = photoRepository.findTop1000ByAddressContaining(interest.getArea(), sort);

			for (Photo photo : photos) {
				if (photo.getStory().getStatus().equals(StoryStatus.PUBLISHED)) {
					MyPopularPhotoResponse response = new MyPopularPhotoResponse();
					response.setFilePath(photo.getFilename());
					response.setPhotoNo(photo.getPhotoNo());
					response.setStoryNo(photo.getStory().getStoryNo());
					response.setTag(photo.getTag());
					User storyUser = userRepository.findByUserno(photo.getStory().getUserNo());
					response.setUserNickname(storyUser.getNickname());
					responses.add(response);
				}
			}
		}

		return responses;
	}

	private Sort sortByDate() {
		return Sort.by(Sort.Direction.DESC, "date");
	}

}
