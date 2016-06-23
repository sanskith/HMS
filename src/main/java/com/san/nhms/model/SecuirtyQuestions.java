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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "USER_QUESTIONS")
public class SecuirtyQuestions implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_QUESTIONS_S")
	@SequenceGenerator(name = "USER_QUESTIONS_S", sequenceName = "USER_QUESTIONS_S", allocationSize = 1)
	private Long id;

	private String question;

	private String answer;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private Users users;

	public SecuirtyQuestions() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
	
	@Override
	public boolean  equals (Object object) {
	boolean result = false;
	if (object == null || object.getClass() != getClass()) {
	    result = false;
	} else {
		SecuirtyQuestions questions = (SecuirtyQuestions) object;
	    if (this.question == questions.getQuestion() && this.answer == questions.getAnswer()) {
	        result = true;
	    }
	}
	return result;
	}

}
