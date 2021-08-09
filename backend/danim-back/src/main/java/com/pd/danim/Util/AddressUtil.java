package com.pd.danim.Util;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class AddressUtil {

    public enum HttpMethodType { POST, GET, DELETE }

    private static final String API_SERVER_HOST  = "https://dapi.kakao.com";

    private static final String API_ADDRESS_PATH = "/v2/local/geo/coord2address.json";

    public static String ConvertAddress(String lat, String lng) {
    	
    	String realAddress = null;
    	
    	try {
            String apiURL = API_SERVER_HOST+API_ADDRESS_PATH+"?x="+lat+"&y="+lng;
            URL url = new URL(apiURL);
            
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Authorization", "KakaoAK de49cf6bf799cc195f22eefb1977d4c1");
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { 
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            
            String result = response.toString();
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);
            JSONArray documents = (JSONArray) jsonObject.get("documents");
            
            for (int i = 0; i < documents.size(); i++) {
            	JSONObject object = (JSONObject) documents.get(i);
            	JSONObject address = (JSONObject) object.get("address") ;
				realAddress = (String)address.get("address_name");
				
				JSONObject roadAddress = (JSONObject) object.get("road_address");
			}
            
    	}catch(Exception e){
    		
    	}
		return realAddress;
    }
}

