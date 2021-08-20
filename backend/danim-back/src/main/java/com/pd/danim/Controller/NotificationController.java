package com.pd.danim.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.pd.danim.Form.Request.NotificationReadRequest;
import com.pd.danim.Service.NotificationService;

@RestController
public class NotificationController {

	@Autowired
	private NotificationService notiService;
	
	
	@PostMapping("/noti/read")
	public ResponseEntity<String> notiRead(@RequestBody NotificationReadRequest request){
		
		String nickname = request.getNickname();
		for (int i = 0; i < request.getNotis().size(); i++) {
			notiService.readNoti(nickname, request.getNotis().get(i).getUuid());
		}
		return new ResponseEntity<String>("success",HttpStatus.OK);
	}
}
