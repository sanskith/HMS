package com.san.nhms.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name = "Users.findAll", query = "SELECT u FROM Users u")
@Table(name = "USERS")
public class Users implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_S")
	@SequenceGenerator(name = "USER_S", sequenceName = "USER_S", allocationSize = 1)
	@Column(name = "id")
	private Long id;

	private String email;

	private String name;

	private String password;

	private String phone;

	private String username;

	@Column(name = "IS_ADMIN")
	private boolean admin;

	@Column(name = "IS_ACTIVE")
	private boolean active;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL ,mappedBy="users")
	private List<SecuirtyQuestions> secuirtyQuestions = new ArrayList<>();

	public Users() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public List<SecuirtyQuestions> getSecuirtyQuestions() {
		return secuirtyQuestions;
	}

	public void setSecuirtyQuestions(List<SecuirtyQuestions> secuirtyQuestions) {
		this.secuirtyQuestions = secuirtyQuestions;
	}
}