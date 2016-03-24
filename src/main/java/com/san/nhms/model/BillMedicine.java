package com.san.nhms.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "BILL_MEDICINE")
public class BillMedicine implements Serializable {

	private static final long serialVersionUID = -8613088477447078917L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BILL_MEDICINE_S")
	@SequenceGenerator(name = "BILL_MEDICINE_S", sequenceName = "BILL_MEDICINE_S",allocationSize = 1)
	private Long id;

	private long units;

	@ManyToOne
	@JoinColumn(name = "BILL_ID")
	private Bill bill;

	@ManyToOne
	@JoinColumn(name = "MEDICINE_ID")
	private Medicine medicine;

	public long getUnits() {
		return units;
	}

	public void setUnits(long units) {
		this.units = units;
	}

	public Bill getBill() {
		return bill;
	}

	public void setBill(Bill bill) {
		this.bill = bill;
	}

	public Medicine getMedicine() {
		return medicine;
	}

	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
	}

}
