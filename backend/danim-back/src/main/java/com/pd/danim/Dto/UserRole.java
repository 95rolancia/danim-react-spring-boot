package com.pd.danim.Dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
	BANNED, MEMBER, ADMIN, DELETED;
}
