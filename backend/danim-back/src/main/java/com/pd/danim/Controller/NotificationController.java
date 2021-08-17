package com.pd.danim.Controller;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.common.collect.Lists;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.iid.FirebaseInstanceId;
import com.pd.danim.Form.Request.NotificationRequest;
import com.pd.danim.Service.NotificationService;

@RestController
public class NotificationController {

	@Autowired
	private NotificationService notiService;
	
	@PostMapping("/test")
	public void Test(HttpServletRequest request) throws IOException, FirebaseAuthException {
		// 푸시보내기 TEST

//		String FCM_URL = "https://fcm.googleapis.com/fcm/send";
		// http v1
		String FCM_URL = "https://fcm.googleapis.com/v1/projects/danim-89ae9/messages:send";
		String server_key = "AAAAl91rKQo:APA91bHYWQ8pPykwkSzXjZrzP4olRrq4Mz3rSXSMe3_402qokfilXk-5jfLWVA6fXl__49YvIIzIni1Qe0pBX_l9B90ZVXALzUYqYb0-YW8r-pdpqnbLqhejovzlF8dEOQNTMFRvwBsE";
		String tokenId = "ya29.c.Kp8BDAiXgnXwmtMTr3TeA8fAAOSkWuaawxizXrTUxwXiYIPlJFPSBnb5lXIK4A1Dt0QR2XVDhDyHrF19oHupxZwo_ovZPuBGSvhgZPEvRttnVNebeL_gyC5cifc4-emb6uXkbu7HLKkOFuOpZp9oMzK6NzWyUJRYDgmoHwErIM7nI9088AylJvWdSoODZrzRkOc7BuPhO0G3SsVEoq7Rkhqp";

		String result = "";

		URL url = new URL(FCM_URL);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();

		conn.setUseCaches(false);
		conn.setDoInput(true);
		conn.setDoOutput(true);

		conn.setRequestMethod("POST");
//		conn.setRequestProperty("Authorization", "key=" + server_key);
		conn.setRequestProperty("Authorization", "Bearer "+ tokenId);
		conn.setRequestProperty("Content-Type", "application/json; UTF-8");

		JSONObject json = new JSONObject();

//		System.out.println(tokenId.trim());

		try {

//			json.put("to", tokenId.trim());
////			json.compute("registration_ids" , tokens)// 만약 여러명한테 푸시 보내려면  --> FirebaseCloudNotification.java 참고
//			JSONObject data = new JSONObject();
////			data.put("url", "https://test.com");
//			data.put("url", "http://localhost:8080/test");
//			data.put("icon", "test.png");
//			json.put("data", data);
//
//			JSONObject info = new JSONObject();
//			info.put("title", "푸시 테스트");
//			info.put("body", "teeeeeeeeeeeeeest");
//			json.put("notification", info);
//			
			
			JSONObject message = new JSONObject();
			message.put("topic", "news");
			
			JSONObject notification = new JSONObject();
			notification.put("title", "Breaking news");
			notification.put("body", "News new story available");
			message.put("notification", notification);
			
			JSONObject data = new JSONObject();
			data.put("story_id","story_12345");
			message.put("data", data);
			
			json.put("message", message);
			

		} catch (JSONException e1) {
			System.out.println("e1에러");
			e1.printStackTrace();

		}

		try {

			OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
			wr.write(json.toString());
//			System.out.println(conn.getOutputStream());
//			System.out.println(json.toString());
			wr.flush();

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;


			while ((output = br.readLine()) != null) {
				System.out.println(output);
			}

			result = "succcess";

		} catch (Exception e) {
			System.out.println("e2에러");

			e.printStackTrace();
			result = "failure";

		}
	}

	@PostMapping("/token")
	private String getAccessToken() throws IOException {
		String firebaseConfigPath = "firebase/danim-89ae9-firebase-adminsdk-4v8tv-df518fb5fb.json";

		GoogleCredentials googleCredentials = GoogleCredentials
				.fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
				.createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"));

		googleCredentials.refreshIfExpired();

		return googleCredentials.getAccessToken().getTokenValue();
	}

	@RequestMapping(value = "/fcmTest", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
	public void fcmTest() throws Exception {
		try {

			String path = "C:\\Users\\dlwhd\\OneDrive\\바탕 화면\\danim\\backend\\danim-back\\src\\main\\resources\\firebase\\danim-89ae9-firebase-adminsdk-4v8tv-df518fb5fb.json";
			String MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
			String[] SCOPES = { MESSAGING_SCOPE };

			GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new FileInputStream(path))
					.createScoped(Arrays.asList(SCOPES));
			googleCredentials.refreshIfExpired();

			HttpHeaders headers = new HttpHeaders();
			headers.add("content-type", MediaType.APPLICATION_JSON_VALUE);
			headers.add("Authorization", "Bearer " + googleCredentials.getAccessToken());
			
			System.out.println(googleCredentials.getAccessToken().getTokenValue());

			JSONObject notification = new JSONObject();
			notification.put("body", "TEST");
			notification.put("title", "TEST");

			JSONObject message = new JSONObject();
			message.put("token",
					"fa_qIyte8d4:APA91bHOGnZulT059PyK3z_sb1dIkDXTiZUIuRksmS7TdK6XgXAS5kopeGIwUfyhad3X3iXMNknCUOZaF6_mgoj1ohG10CanRyJ_EW1d3xN2E-1DPiLdbMK4pdOgdhB1ztZClqB-25rC");
			message.put("notification", notification);

			JSONObject jsonParams = new JSONObject();
			jsonParams.put("message", message);

			HttpEntity<JSONObject> httpEntity = new HttpEntity<JSONObject>(jsonParams, headers);
			RestTemplate rt = new RestTemplate();

			ResponseEntity<String> res = rt.exchange("https://fcm.googleapis.com/v1/projects/danim-89ae9/messages:send",
					HttpMethod.POST, httpEntity, String.class);

			if (res.getStatusCode() != HttpStatus.OK) {
//	                log.debug("FCM-Exception");
//	                log.debug(res.getStatusCode().toString());
//	                log.debug(res.getHeaders().toString());
//	                log.debug(res.getBody().toString());
				System.out.println("FCM-Exception");

			} else {
//	                log.debug(res.getStatusCode().toString());
//	                log.debug(res.getHeaders().toString());
//	                log.debug(res.getBody().toLowerCase());
				System.out.println("버그");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@GetMapping("/test2")
	public void test2() {
		NotificationRequest request = new NotificationRequest();
		request.setDataId("장준혁");
		request.setIsRead(false);
		request.setToUserNickname("장준혁");
		request.setType("follow");
		String nickname = "이종현33333";
		notiService.saveNoti(request,nickname);
		
		
		request.setDataId("노영주");
		request.setIsRead(false);
		request.setToUserNickname("김경원");
		request.setType("follow");
		nickname = "노영주";
		notiService.saveNoti(request,nickname);
		
	}
	
	@GetMapping("/test3")
	public void test3() {
		
		String notiId = "장준혁";
		String nickname = "이종현33333";
		
		notiService.delteNoti(notiId, nickname);
	}
	
	
	
	
	
	
	
	
	
}
