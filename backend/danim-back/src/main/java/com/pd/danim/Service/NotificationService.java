package com.pd.danim.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.database.*;
import com.pd.danim.DTO.User;
import com.pd.danim.Form.Request.NotificationRequest;
import com.pd.danim.Form.Request.NotificationSaveRequest;
import com.pd.danim.Repository.UserRepository;

//추후 util로 class명 변경
@Service
public class NotificationService {
	
	@Autowired
	private UserRepository userRepository;

	private void saveNotificationData(String fromUserEmail, DatabaseReference notiRef, String type) {
		notiRef.addListenerForSingleValueEvent(new ValueEventListener() {
			@Override
			public void onDataChange(DataSnapshot snapshot) {
				exFindData: for (DataSnapshot data : snapshot.getChildren()) {
					String postKey = data.getKey();
					for (DataSnapshot valueForFrom : data.getChildren()) {
						if (valueForFrom.getKey().equals("from")) {
							if (valueForFrom.getValue() == fromUserEmail) {
								for (DataSnapshot valueForType : data.getChildren()) {
									if (valueForType.getKey().equals("type")) {
										if (valueForType.getValue().equals(type)) {
											DatabaseReference deleteRef = notiRef.child(postKey);
											deleteRef.removeValueAsync();
											break exFindData;
										}
									}
								}
							}
						}
					}
				}
			}

			@Override
			public void onCancelled(DatabaseError error) {
			}
		});
	}

	@Transactional
	public void saveNoti(NotificationRequest notiRequest, String nickname) {
		
		LocalDateTime curDateTime = LocalDateTime.now();
		System.out.println(curDateTime);
		Date realDate = new Date();
		SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		String time1 = format1.format(realDate);
//		System.out.println("time은"+time1);
//		String date2 = (String) curDateTime;
		
		
//		String nowDate = curDateTime.format(DateTimeFormatter.ofPattern("a yyyy-MM-dd hh:mm:ss"));
//		System.out.println(nowDate);
		NotificationSaveRequest saveRequest = new NotificationSaveRequest(time1, notiRequest.getDataId(), nickname,
				notiRequest.getIsRead(), notiRequest.getType());

		String toId = notiRequest.getToUserNickname();
		//	System.out.println("팔로우 받은 사람의 닉네임은" + toId);
		String type = notiRequest.getType();


		FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("noti"); // 최상위 root: noti
		//	ref.setValueAsync(nickname);
		//	ref.child(toId).setValueAsync(toId);

		DatabaseReference notiRef = ref.child(toId); // 알림 받는 사람의 닉네임
		DatabaseReference nextNotiRef = notiRef.push(); // 다음 키값으로 푸시
		String postId = nextNotiRef.getKey(); // 현재 알람의 키값을 가져옴
		DatabaseReference saveNoti = notiRef.child(postId);// to의 아이디 값의 child node

		//	saveNoti.setValueAsync(postId);		
		//	User user = userRepository.findByNickname(nickname);
		//	if(user.getProfile()!=null) {
		//		saveRequest.setProfile(user.getProfile());
		//	}
		saveRequest.setUuid(postId);
		//다르게 설정해줘야함
		if(type.equals("follow")) {
			saveNoti.setValueAsync(saveRequest);
		} else if(type.equals("love")){
			saveNoti.setValueAsync(saveRequest);
		} else {
			saveNoti.setValueAsync(saveRequest);
		}
	}
	
	
	@Transactional
	public void delteNoti(String notiId, String nickname) {
		
		FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("noti");
		DatabaseReference notiRef = ref.child(notiId);
		
//		System.out.println(notiRef);
//		System.out.println(notiRef.getRef());
		
		DatabaseReference deleteRef = notiRef.child(notiId);
		deleteRef.removeValueAsync();
	}
	
	@Transactional
	public void readNoti(String nickname, String uuid) {
		
		FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("noti");
		
		DatabaseReference notiRef = ref.child(nickname); // noti의 child node: to의 아이디 값
		
		DatabaseReference uuidRef = notiRef.child(uuid);
		uuidRef.child("isRead").setValueAsync(true);
		
	}
	
	
	
	
	
	
	
	
	

}
