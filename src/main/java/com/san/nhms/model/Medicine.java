package com.san.nhms.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the medicine database table.
 * 
 */
@Entity
@NamedQuery(name = "Medicine.findAll", query = "SELECT m FROM Medicine m")
public class Medicine implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MEDICINE_S")
	@SequenceGenerator(name = "MEDICINE_S", sequenceName = "MEDICINE_S", allocationSize = 1)
	private Long id;

	private String company;

	@Temporal(TemporalType.DATE)
	@Column(name = "EXP_DATE")
	private Date expDate;

	@Temporal(TemporalType.DATE)
	@Column(name = "MNF_DATE")
	private Date mnfDate;

	private String name;

	@Column(name = "SLAE_PRICE")
	private Double price;

	@Column(name = "PURCHASE_PRICE")
	private Double purchasePrice;

	@Column(name = "TOTAL_TABLETS")
	private Long totalTablets;

	@Column(name = "PRICE_PER_TABLET")
	private Double tabletPrice;

	@Column(name = "TABLETS_PER_STRP")
	private Long stripTablets;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users users;

	public Medicine() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCompany() {
		return this.company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Date getExpDate() {
		return this.expDate;
	}

	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}

	public Date getMnfDate() {
		return this.mnfDate;
	}

	public void setMnfDate(Date mnfDate) {
		this.mnfDate = mnfDate;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(Double purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public Long getTotalTablets() {
		return totalTablets;
	}

	public void setTotalTablets(Long totalTablets) {
		this.totalTablets = totalTablets;
	}

	public Double getTabletPrice() {
		return tabletPrice;
	}

	public void setTabletPrice(Double tabletPrice) {
		this.tabletPrice = tabletPrice;
	}

	public Long getStripTablets() {
		return stripTablets;
	}

	public void setStripTablets(Long stripTablets) {
		this.stripTablets = stripTablets;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
}