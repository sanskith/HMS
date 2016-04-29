package com.san.nhms.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "BILL_MEDICINE")
public class BillMedicine implements Serializable {

	private static final long serialVersionUID = 1L;

	@Embeddable
	public static class Id implements Serializable {

		@Column(name = "BILL_ID")
		private Long billId;

		@Column(name = "MEDICINE_ID")
		private Long medicineId;

		public Id() {
		}

		public Id(Long billId, Long medicineId) {
			this.billId = billId;
			this.medicineId = medicineId;
		}

		public boolean equals(Object o) {
			if (o != null && o instanceof Id) {
				Id that = (Id) o;
				return this.billId.equals(that.billId) && this.medicineId.equals(that.medicineId);
			}
			return false;
		}

		public int hashCode() {
			return billId.hashCode() + medicineId.hashCode();
		}

	}

	@EmbeddedId
	protected Id id = new Id();

	@Column(updatable = false)
	private Long units;

	@ManyToOne
	@JoinColumn(name = "BILL_ID", insertable = false, updatable = false)
	@JsonBackReference
	private Bill bill;

	@ManyToOne
	@JoinColumn(name = "MEDICINE_ID", insertable = false, updatable = false)
	private Medicine medicine;

	public BillMedicine() {

	}

	public BillMedicine(Long units, Bill bill, Medicine medicine) {

		// Set fields
		this.units = units;
		this.bill = bill;
		this.medicine = medicine;

		// Set identifier values
		this.id.billId = bill.getId();
		this.id.medicineId = medicine.getId();

		// Guarantee referential integrity if made bidirectional
		bill.getBillMedicines().add(this);
		// medicine.getBillMedicines().add(this);
	}

	public Long getUnits() {
		return units;
	}

	public void setUnits(Long units) {
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

	public Id getId() {
		return id;
	}

	public void setId(Id id) {
		this.id = id;
	}
}
