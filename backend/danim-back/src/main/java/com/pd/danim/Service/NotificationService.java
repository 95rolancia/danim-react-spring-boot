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
		Date realDate = new Date();
		SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		String time1 = format1.format(realDate);
		NotificationSaveRequest saveRequest = new NotificationSaveRequest(time1, notiRequest.getDataId(), nickname,
				notiRequest.getIsRead(), notiRequest.getType());

		String toId = notiRequest.getToUserNickname();
		String type = notiRequest.getType();


		FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("noti"); 

		DatabaseReference notiRef = ref.child(toId); 
		DatabaseReference nextNotiRef = notiRef.push(); 
		String postId = nextNotiRef.getKey(); 
		DatabaseReference saveNoti = notiRef.child(postId);

		saveRequest.setStoryNo(notiRequest.getStoryNo());
		saveRequest.setUuid(postId);

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
		
		DatabaseReference deleteRef = notiRef.child(notiId);
		deleteRef.removeValueAsync();
	}
	
	@Transactional
	public void readNoti(String nickname, String uuid) {
		
		FirebaseDatabase database = FirebaseDatabase.getInstance();
		DatabaseReference ref = database.getReference("noti");
		
		DatabaseReference notiRef = ref.child(nickname); 
		
		DatabaseReference uuidRef = notiRef.child(uuid);
		uuidRef.child("isRead").setValueAsync(true);
		
	}
	
	
	
	
	
	
	
	
	

}
