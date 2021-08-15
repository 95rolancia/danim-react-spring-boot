package com.pd.danim.Form.Response;

import java.util.ArrayList;
import java.util.List;

public class SearchPlanPlaceResponse {
	private List<PlaceResponse> places = new ArrayList();

	public List<PlaceResponse> getPlaces() {
		return places;
	}

	public void setPlaces(List<PlaceResponse> places) {
		this.places = places;
	}
	
}
