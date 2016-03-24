package com.san.nhms.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * The persistent class for the bill database table.
 * 
 */
@Entity
@NamedQuery(name = "Bill.findAll", query = "SELECT b FROM Bill b")
public class Bill implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BILL_S")
	@SequenceGenerator(name = "BILL_S", sequenceName = "BILL_S",allocationSize = 1)
	private Long id;

	@Column(name = "CUSTOMER_NAME")
	private String customerName;

	@Column(name = "CUSTOMER_PHONE")
	private String phone;

	@Temporal(TemporalType.DATE)
	private Date date;

	private Double total;
	
	@Column(name = "CUSTOMER_AGE")
	private int age;
	
	@Column(name = "CUSTOMER_GENDER")
	private String gender;

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	// uni-directional many-to-one association to Users
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users users;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "medicine")
	private List<BillMedicine> billMedicines;
	
	public Bill() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Date getDate() {
		return this.date;
	}

	public void setDate(Date date) {
		this.date = date;
	}


	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public List<BillMedicine> getBillMedicines() {
		return billMedicines;
	}

	public void setBillMedicines(List<BillMedicine> billMedicines) {
		this.billMedicines = billMedicines;
	}
}