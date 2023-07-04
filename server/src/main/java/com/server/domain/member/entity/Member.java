package com.server.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.server.global.audit.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String nickname;
    @Enumerated(value = EnumType.STRING)
    @Column(length = 32, columnDefinition = "varchar(32) default 'ROLE_USER'")
    private Role role = Role.USER;

    @Builder
    public Member(Long memberId, String email, String password, String nickname) {
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    @Getter
    @RequiredArgsConstructor
    public enum Role {
        USER("ROLE_USER"),
        SOCIAL("ROLE_SOCIAL");
        private final String value;
    }

    public void updateEncryptedPassword(String password) {
        this.password = password;
    }
}